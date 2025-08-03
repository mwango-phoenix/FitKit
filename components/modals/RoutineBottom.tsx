import { Routine } from "@/.expo/types/routine";
import ExerciseItem from "@/components/ExerciseItem";
import React, { forwardRef, useMemo } from "react";
import { Text, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useFetchExercises } from "@/services/useFetchExercises";

interface Props {
  routine: Routine | null;
}

const RoutineBottom = forwardRef<BottomSheet, Props>(
  ({ routine }: Props, ref) => {
    const snapPoints = useMemo(() => ["50%", "100%"], []);

    const exerciseIds = useMemo(
      () => routine?.exercises.map((ex) => ex.exerciseId) || [],
      [routine]
    );

    const { exercises, loading, error } = useFetchExercises(exerciseIds);

    return (
      <BottomSheet
        snapPoints={snapPoints}
        ref={ref}
        index={2}
        enablePanDownToClose
      >
        <BottomSheetScrollView className="p-4">
          {routine ? (
            <>
              <Text className="text-xl font-bold mb-2">{routine.name}</Text>

              {loading && (
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
              )}

              {exercises.map((ex, index) => (
                <ExerciseItem key={ex.exerciseId} exercise={ex} />
              ))}
            </>
          ) : (
            <Text className="text-gray-500">No routine selected</Text>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

export default RoutineBottom;
