import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Exercise } from "@/.expo/types/routine";

interface Props {
  exercise: Exercise;
  onPress?: () => void;
}
const ExerciseTile = ({ exercise, onPress }: Props) => {
  return (
    <TouchableOpacity className="shadow-md my-3" onPress={onPress}>
      <View className="flex-row items-center bg-background p-5 rounded-xl my-4">
        {/* Image */}
        <View className="bg-primary border border-secondary p-1 rounded-md mr-3 w-16 h-16">
          {/* <Image source={img} className="w-16 h-16" resizeMode="contain" /> */}
        </View>

        {/* Name + Equipment */}
        <View className="flex-1 ">
          <Text className="text-base font-semibold text-dark leading-snug">
            {exercise.name}
          </Text>
          <Text className="text-md text-gray-500">{exercise.equipment[0]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseTile;
