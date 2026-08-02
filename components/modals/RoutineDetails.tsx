import React, { forwardRef } from "react";
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetFuncs } from "./BottomSheet";
import ExerciseItem from "@/components/ExerciseItem";
import { Routine } from "@/.expo/types/routine";

interface Props {
  routine: Routine | null;
}

const RoutineBottomSheet =  forwardRef<BottomSheetFuncs, Props>(
  ({ routine }: Props, ref) => {
  return (
    <BottomSheet snapPoint={'50'}>
      <View className="p-4">
        {routine ? (
          <>
            <Text className="text-xl font-bold my-2">{routine.name}</Text>
            {routine.exercises.map((ex, index) => (
              <ExerciseItem key={index} exercise={ex}/>
            ))}
          </>
        ) : (
          <Text className="text-gray-500">No routine selected</Text>
        )}
      </View>
    </BottomSheet>
  );
});

export default RoutineBottomSheet;
