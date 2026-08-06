import { Dimensions, Pressable, Text, View } from "react-native";
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  AnimatedScrollViewProps,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colours } from "@/constants/Colours";

interface Props extends AnimatedScrollViewProps {
  /** e.g. ["50%", "100%"] — matches @gorhom/bottom-sheet's snapPoints prop */
  snapPoints: string[];
  /** Initial/controlled snap index. -1 means closed. Defaults to -1. */
  index?: number;
  /** If true, dragging past the last (smallest) snap point closes the sheet */
  enablePanDownToClose?: boolean;
  /** Fired whenever the resolved snap index changes (-1 when closed) */
  onChange?: (index: number) => void;
}

export interface BottomSheetFuncs {
  snapToIndex: (index: number) => void;
  close: () => void;
}

const SPRING_CONFIG = { damping: 100, stiffness: 400 };

const BottomSheet = forwardRef<BottomSheetFuncs, Props>(
  (
    {
      snapPoints,
      index = -1,
      enablePanDownToClose = true,
      onChange,
      children,
      ...rest
    }: Props,
    ref
  ) => {
    const inset = useSafeAreaInsets();
    const { height } = Dimensions.get("screen");

    // Convert each "50%" / "100%" snap point into an absolute `top` value.
    // Sorted ascending by height-from-top-of-screen (i.e. largest sheet last).
    const snapTops = useMemo(() => {
      return snapPoints
        .map((point) => {
          const percentage = parseFloat(point) / 100;
          return height - height * percentage;
        })
        .sort((a, b) => b - a); // largest `top` (smallest sheet) first
    }, [snapPoints, height]);

    const sheetTop = useSharedValue(height); // start fully closed (off-screen)
    const context = useSharedValue(0);
    const currentIndexRef = React.useRef(-1);
    // Mirrors currentIndexRef in state so the backdrop can conditionally
    // mount/receive touches (refs alone don't trigger re-renders).
    const [isOpen, setIsOpen] = useState(false);
    const [closeButtonFocused, setCloseButtonFocused] = useState(false);

    const scrollStart = useSharedValue(0);
    const scrollOffset = useSharedValue(0);
    const [enableScroll, setEnableScroll] = useState(true);
    const scrollViewGesture = Gesture.Native();

    const notifyChange = useCallback(
      (newIndex: number) => {
        if (currentIndexRef.current !== newIndex) {
          currentIndexRef.current = newIndex;
          setIsOpen(newIndex !== -1);
          onChange?.(newIndex);
        }
      },
      [onChange]
    );

    /*
      Snap to a given index. -1 closes the sheet.
    */
    const snapToIndex = useCallback(
      (targetIndex: number) => {
        "worklet";
        if (targetIndex < 0 || targetIndex >= snapTops.length) {
          sheetTop.value = withSpring(height, SPRING_CONFIG);
          scheduleOnRN(notifyChange, -1);
          return;
        }
        sheetTop.value = withSpring(snapTops[targetIndex], SPRING_CONFIG);
        scheduleOnRN(notifyChange, targetIndex);
      },
      [snapTops, height, sheetTop, notifyChange]
    );

    const close = useCallback(() => {
      sheetTop.value = withSpring(height, SPRING_CONFIG);
      notifyChange(-1);
    }, [height, sheetTop, notifyChange]);

    useImperativeHandle(
      ref,
      () => ({
        snapToIndex: (i: number) => snapToIndex(i),
        close,
      }),
      [snapToIndex, close]
    );

    // Respond to the controlled `index` prop, same as @gorhom's `index`
    useEffect(() => {
      snapToIndex(index);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, snapTops]);

    /*
      Given a raw `top` value while dragging, find the nearest snap point
      (or "closed" if enablePanDownToClose and dragged past the last one).
    */
    const resolveNearestSnap = useCallback(
      (rawTop: number) => {
        "worklet";
        const candidates = enablePanDownToClose
          ? [...snapTops, height]
          : snapTops;

        let nearestIdx = 0;
        let nearestDist = Math.abs(rawTop - candidates[0]);
        for (let i = 1; i < candidates.length; i++) {
          const dist = Math.abs(rawTop - candidates[i]);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestIdx = i;
          }
        }

        const isClosed =
          enablePanDownToClose && nearestIdx === candidates.length - 1;

        return {
          top: candidates[nearestIdx],
          index: isClosed ? -1 : nearestIdx,
        };
      },
      [snapTops, height, enablePanDownToClose]
    );

    const animationStyle = useAnimatedStyle(() => ({
      top: sheetTop.value,
    }));

    // Fades in from 0 -> 0.5 opacity as the sheet moves from fully closed
    // (top === screen height) up to its furthest (largest) snap point.
    const backdropStyle = useAnimatedStyle(() => {
      const closedTop = height;
      const openTop = snapTops[snapTops.length - 1];
      const opacity = interpolate(
        sheetTop.value,
        [closedTop, openTop],
        [0, 0.5],
        Extrapolation.CLAMP
      );
      return { opacity };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = sheetTop.value;
      })
      .onUpdate((event) => {
        const smallestTop = snapTops[snapTops.length - 1];
        const proposed = context.value + event.translationY;
        // Clamp so it can't be dragged above the largest (fullest) snap point
        sheetTop.value = Math.max(proposed, smallestTop);
      })
      .onEnd(() => {
        const { top, index: newIndex } = resolveNearestSnap(sheetTop.value);
        sheetTop.value = withSpring(top, SPRING_CONFIG);
        scheduleOnRN(notifyChange, newIndex);
      });

    const onScroll = useAnimatedScrollHandler({
      onBeginDrag: (event) => {
        scrollStart.value = event.contentOffset.y;
      },
      onScroll: (event) => {
        scrollOffset.value = event.contentOffset.y;
      },
    });

    const panScroll = Gesture.Pan()
      .onBegin(() => {
        context.value = sheetTop.value;
      })
      .onUpdate((event) => {
        const smallestTop = snapTops[snapTops.length - 1];
        if (event.translationY < 0) {
          sheetTop.value = Math.max(
            context.value + event.translationY,
            smallestTop
          );
        } else if (event.translationY > 0 && scrollOffset.value === 0) {
          scheduleOnRN(setEnableScroll, false);
          sheetTop.value = withSpring(
            Math.max(
              context.value + event.translationY - scrollStart.value,
              smallestTop
            ),
            SPRING_CONFIG
          );
        }
      })
      .onEnd(() => {
        scheduleOnRN(setEnableScroll, true);
        const { top, index: newIndex } = resolveNearestSnap(sheetTop.value);
        sheetTop.value = withSpring(top, SPRING_CONFIG);
        scheduleOnRN(notifyChange, newIndex);
      });

    return (
      <>
        {isOpen && (
          <Animated.View
            style={[
              { position: "absolute", inset: 0, backgroundColor: "black" },
              backdropStyle,
            ]}
            pointerEvents="auto"
          >
            {/* Tapping anywhere outside the sheet closes it */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              style={{ flex: 1 }}
              onPress={close}
            />
          </Animated.View>
        )}
        <GestureDetector gesture={pan}>
          <Animated.View
            className="absolute inset-0 bg-primary rounded-t-3xl"
            style={[animationStyle, { paddingBottom: inset.bottom }]}
          >
            <View className="flex-row items-center justify-center pt-2 pb-1 relative" style={{ minHeight: 48 }}>
              {/* Handle */}
              <View className="w-12 h-1.5 bg-secondary rounded-lg" />

              {/* Explicit close button for accessibility / discoverability.
                  WCAG 2.5.5/2.5.8: >=44x44 touch target.
                  WCAG 1.4.11: >=3:1 contrast for the button's boundary against
                  its background (solid secondary vs light/primary backdrop).
                  WCAG 2.4.7: visible pressed/focus state so the interaction
                  isn't conveyed by color change alone. */}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                accessibilityHint="Closes this sheet"
                onPress={close}
                onFocus={() => setCloseButtonFocused(true)}
                onBlur={() => setCloseButtonFocused(false)}
                style={({ pressed }) => [
                  {
                    position: "absolute",
                    right: 8,
                    top: -2,
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: pressed ? Colours.dark : Colours.secondary,
                    borderWidth: closeButtonFocused ? 2 : 0,
                    borderColor: Colours.light,
                  },
                ]}
              >
                <Text
                  className="font-bold text-lg leading-none"
                  style={{ color: Colours.light }}
                >
                  ✕
                </Text>
              </Pressable>
            </View>
            <GestureDetector
              gesture={Gesture.Simultaneous(scrollViewGesture, panScroll)}
            >
              <Animated.ScrollView
                {...rest}
                scrollEnabled={enableScroll}
                scrollEventThrottle={16}
                onScroll={onScroll}
              >
                {children}
              </Animated.ScrollView>
            </GestureDetector>
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

export default BottomSheet;