import { Exercise } from "@/.expo/types/routine";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { ImageBackground, Text, View } from "react-native";
import SwitchSelector from "../SwitchSelector";

interface Props {
  exercise: Exercise | null;
}

const ExerciseBottom = forwardRef<BottomSheet, Props>(
  ({ exercise }: Props, ref) => {
    // Define snap points for the bottom sheet
    const snapPoints = useMemo(() => ["50%", "100%"], []);

    return (
      <BottomSheet
        snapPoints={snapPoints}
        ref={ref}
        index={-1}
        enablePanDownToClose
      >
        <BottomSheetScrollView className="p-4">
          {exercise ? (
            <>
              <View>
                <Text className="text-xl font-bold mb-2 text-center">
                  {exercise.name}
                </Text>
                <ImageBackground
                  source={{ uri: exercise.img }}
                  className="w-full h-48 bg-darkBackground rounded-2xl"
                  imageStyle={{ borderRadius: 16 }}
                />
              </View>
              {/* {loading && (
                <ActivityIndicator
                  size="small"
                  color="#4F46E5"
                  className="my-4"
                />
              )}

              {error && (
                <Text className="text-red-500 mb-4">
                  Failed to load exercises.
                </Text>
              )} */}
              <SwitchSelector />
            </>
          ) : (
            <Text className="text-gray-500">No exercise selected</Text>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

export default ExerciseBottom;
