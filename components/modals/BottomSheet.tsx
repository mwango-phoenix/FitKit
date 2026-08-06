import { Dimensions, View } from "react-native";
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
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends AnimatedScrollViewProps {
  /** e.g. ["50%", "100%"] */
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

    const scrollStart = useSharedValue(0);
    const scrollOffset = useSharedValue(0);
    const [enableScroll, setEnableScroll] = useState(true);
    const scrollViewGesture = Gesture.Native();

    const notifyChange = useCallback(
      (newIndex: number) => {
        if (currentIndexRef.current !== newIndex) {
          currentIndexRef.current = newIndex;
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
          runOnJS(notifyChange)(-1);
          return;
        }
        sheetTop.value = withSpring(snapTops[targetIndex], SPRING_CONFIG);
        runOnJS(notifyChange)(targetIndex);
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

    useEffect(() => {
      snapToIndex(index);
    }, [index, snapTops]);

    /*
      Given a `top` value while dragging, find the nearest snap point.
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

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = sheetTop.value;
      })
      .onUpdate((event) => {
        const smallestTop = snapTops[snapTops.length - 1];
        const proposed = context.value + event.translationY;
        sheetTop.value = Math.max(proposed, smallestTop);
      })
      .onEnd(() => {
        const { top, index: newIndex } = resolveNearestSnap(sheetTop.value);
        sheetTop.value = withSpring(top, SPRING_CONFIG);
        runOnJS(notifyChange)(newIndex);
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
          runOnJS(setEnableScroll)(false);
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
        runOnJS(setEnableScroll)(true);
        const { top, index: newIndex } = resolveNearestSnap(sheetTop.value);
        sheetTop.value = withSpring(top, SPRING_CONFIG);
        runOnJS(notifyChange)(newIndex);
      });

    return (
      <GestureDetector gesture={pan}>
        <Animated.View
          className="absolute inset-0 bg-primary rounded-t-3xl"
          style={[animationStyle, { paddingBottom: inset.bottom }]}
        >
          <View className="flex-row items-center justify-center my-2">
            {/* Handle */}
            <View className="w-12 h-1.5 bg-secondary rounded-lg" />
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
    );
  }
);

export default BottomSheet;