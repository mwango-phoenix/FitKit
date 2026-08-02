import { Dimensions, View } from "react-native";
import React, { forwardRef, useImperativeHandle, useCallback, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  AnimatedScrollViewProps,
  useAnimatedScrollHandler,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends AnimatedScrollViewProps {
  snapPoint: string;
}

export interface BottomSheetFuncs {
  openSheet: () => void;
  closeSheet: () => void;
}

const BottomSheet = forwardRef<BottomSheetFuncs, Props>(
  ({ snapPoint, children, ...rest }: Props, ref) => {
    const inset = useSafeAreaInsets();

    // Calculate the height based on the snapPoints percentage
    const { height } = Dimensions.get("screen");
    const percentage = parseFloat(snapPoint) / 100;
    const sheetHeight = height - height * percentage;
    const sheetTop = useSharedValue(height);
    const context = useSharedValue(0);

    const scrollStart = useSharedValue(0);
    const scrollOffset = useSharedValue(0);
    const [enableScroll, setEnableScroll] = useState(true);
    const scrollViewGesture = Gesture.Native();

    /*
        Functions to open and close the bottom sheet. 
    */

    const openSheet = useCallback(() => {
      "worklet";
      sheetTop.value = withTiming(sheetHeight);
    }, [sheetHeight, sheetTop]);

    const closeSheet = useCallback(() => {
      "worklet";
      sheetTop.value = withTiming(height);
    }, [height, sheetTop]);

    useImperativeHandle(
      ref,
      () => ({
        openSheet,
        closeSheet,
      }),
      [openSheet, closeSheet]
    );

    /************************************************************/

    const animationStyle = useAnimatedStyle(() => {
      const top = sheetTop.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = sheetTop.value;
      })
      // Called to update positioning as the user drags the bottom sheet
      .onUpdate((event) => {
        if (event.translationY < 0) {
          sheetTop.value = withSpring(sheetHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          sheetTop.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (sheetTop.value > sheetHeight + 50) {
          sheetTop.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          sheetTop.value = withSpring(sheetHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
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
      .onUpdate(event => {
        if (event.translationY < 0) {
          sheetTop.value = withSpring(sheetHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else if (event.translationY > 0 && scrollOffset.value === 0) {
          runOnJS(setEnableScroll)(false);
          sheetTop.value = withSpring(
            Math.max(
              context.value + event.translationY - scrollStart.value,
              sheetHeight,
            ),
            {
              damping: 100,
              stiffness: 400,
            },
          );
        }
      })
      .onEnd(() => {
        runOnJS(setEnableScroll)(true);
        if (sheetTop.value > sheetHeight + 50) {
          sheetTop.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          sheetTop.value = withSpring(sheetHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });


    return (
      <>
        <GestureDetector gesture={pan}>
          <Animated.View
            className={`absolute inset-0 bg-primary pb-[${inset.bottom}px]`}
            style={[animationStyle]}
          >
            <View className="flex-row items-center justify-center my-2">
              {/* Handle */}
              <View className="w-50 h-4 bg-secondary rounded-lg" />
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
