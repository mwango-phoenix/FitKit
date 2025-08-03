import React from "react";
import { View, Text, Image } from "react-native";
import { Exercise } from "@/.expo/types/routine";

interface Props {
  exercise: Exercise;
}
const ExerciseItem = ({ exercise }: Props) => {
  return (
    <View className="flex-row items-center bg-background p-5 rounded-xl my-4">
      {/* Image */}
      <View className="bg-primary border border-secondary p-1 rounded-md mr-3 w-16 h-16">
        {/* <Image source={img} className="w-16 h-16" resizeMode="contain" /> */}
      </View>

      {/* Name + Equipment */}
      <View className="flex-1 ">
        <Text className="text-base font-semibold text-dark leading-snug">{exercise.name}</Text>
        <Text className="text-md text-gray-500">{exercise.equipment[0]}</Text>
      </View>

      {/* Sets & Reps */}
      <View className="flex-row ml-2">
        <View className="flow bg-dark px-4 py-2 rounded-md mr-2">
          <Text className="text-light text-sm font-semibold text-center">
            {exercise.sets}
            {"\n"}Sets
          </Text>
        </View>
        <View className="bg-dark px-4 py-2 rounded-md">
          <Text className="text-light text-sm font-semibold text-center">
            {exercise.reps}
            {"\n"}Reps
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExerciseItem;
