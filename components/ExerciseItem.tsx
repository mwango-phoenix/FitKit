import React from "react";
import { View, Text, Image } from "react-native";

interface Props {
  name: string;
  equipment: string;
  sets: number;
  reps: string;
  img: any; 
}

const ExerciseItem = ({ name, equipment, sets, reps, img }: Props) => {
  return (
    <View className="flex-row items-center bg-background p-3 rounded-xl">
      {/* Image */}
      <View className="bg-primary border border-secondary p-1 rounded-md mr-3">
        {/* <Image source={img} className="w-16 h-16" resizeMode="contain" /> */}
      </View>

      {/* Name + Equipment */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-dark">{name}</Text>
        <Text className="text-sm text-gray-500">{equipment}</Text>
      </View>

      {/* Sets & Reps */}
      <View className="flex-row space-x-2 ml-2">
        <View className="bg-dark px-3 py-1.5 rounded-md">
          <Text className="text-light text-sm font-semibold">{sets}{"\n"}Sets</Text>
        </View>
        <View className="bg-dark px-3 py-1.5 rounded-md">
          <Text className="text-light text-sm font-semibold">{reps}{"\n"}Reps</Text>
        </View>
      </View>
    </View>
  );
};

export default ExerciseItem;
