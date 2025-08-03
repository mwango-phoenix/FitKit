import { Routine } from "@/.expo/types/routine";
import ExerciseItem from "@/components/ExerciseItem";
import React, { forwardRef, useMemo } from "react";
import { Text, View } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface Props {
  routine: Routine | null;
}

const RoutineBottom = forwardRef<BottomSheet, Props>(
  ({ routine }: Props, ref) => {
  const snapPoints = useMemo(() => ["50%", "100%"], []);
  return (
    <BottomSheet snapPoints={snapPoints} ref={ref} index={2} enablePanDownToClose={true}>
      <BottomSheetScrollView className="p-4">
        {routine ? (
          <>
            <Text className="text-xl font-bold mb-2">{routine.name}</Text>
            {routine.exercises.map((ex, index) => (
              console.log(routine.exercises),
              <ExerciseItem key={index} exercise={ex} />
            ))}
          </>
        ) : (
          <Text className="text-gray-500">No routine selected</Text>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default RoutineBottom;
