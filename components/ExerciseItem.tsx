import React from "react";
import { View, Text, Image } from "react-native";

interface Exercise {
  name: string;
  equipment: string;
  sets: number;
  reps: string;
  img: any; // local or remote image
}

interface Props {
  exercise: Exercise;
}

const ExerciseItem = ({ exercise }: Props) => {
  console.log("Rendering ExerciseItem:", exercise);
  return (
    <View className="flex-row items-center bg-background p-5 rounded-xl my-4">
      {/* Image */}
      <View className="bg-primary border border-secondary p-1 rounded-md mr-3 w-16 h-16">
        {/* <Image source={img} className="w-16 h-16" resizeMode="contain" /> */}
      </View>

      {/* Name + Equipment */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-dark">{exercise.name}</Text>
        <Text className="text-sm text-gray-500">{exercise.equipment}</Text>
      </View>

      {/* Sets & Reps */}
      <View className="flex-row space-x-2 ml-2">
        <View className="bg-dark px-3 py-1.5 rounded-md">
          <Text className="text-light text-sm font-semibold">
            {exercise.sets}
            {"\n"}Sets
          </Text>
        </View>
        <View className="bg-dark px-3 py-1.5 rounded-md">
          <Text className="text-light text-sm font-semibold">
            {exercise.reps}
            {"\n"}Reps
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExerciseItem;
