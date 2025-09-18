import { Exercise } from "@/.expo/types/routine";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { ImageBackground, Text, View } from "react-native";
import SwitchSelector from "../SwitchSelector";
import { useFirebaseImage } from "@/services/useFirebaseImage";

interface Props {
  exercise: Exercise;
  onClose?: () => void;
}

const ExerciseBottom = forwardRef<BottomSheet, Props>(
  ({ exercise, onClose }: Props, ref) => {
    // Define snap points for the bottom sheet
    const snapPoints = useMemo(() => ["50%", "100%"], []);
    const updatedUrl = `exerciseImages/${exercise.image}`;
    const { url: imageUrl, loading, error } = useFirebaseImage(updatedUrl);
    return (
      <BottomSheet
        snapPoints={snapPoints}
        ref={ref}
        index={-1}
        enablePanDownToClose
        onChange={(index) => {
          if (index === -1) {
            onClose?.();
          }
        }}
      >
        <BottomSheetScrollView className="p-4">
          {exercise ? (
            <>
              <View>
                <Text className="text-xl font-bold mb-2 text-center">
                  {exercise.name}
                </Text>
                {imageUrl && !error ? (
                  <ImageBackground
                    key={exercise.exerciseId}
                    source={{ uri: imageUrl }}
                    className="w-full h-48 bg-darkBackground rounded-2xl opacity-90"
                    imageStyle={{ borderRadius: 16 }}
                  />
                ) : (
                  <View className="w-full h-48 bg-darkBackground rounded-2xl" />
                )}
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
              <View className="mt-4 items-center">
                <SwitchSelector />
              </View>
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
