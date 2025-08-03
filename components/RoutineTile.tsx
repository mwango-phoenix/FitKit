import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

interface Props {
  id: string;
  name: string;
  img: string;
  onPress?: () => void;
}

const RoutineTile = ({ id, name, img, onPress }: Props) => {
  return (
    <TouchableOpacity className="shadow-md my-3" onPress={onPress}>
      <ImageBackground 
        source={require("@/assets/images/legDay1.jpg")}
        className="w-full h-48 bg-darkBackground rounded-2xl opacity-90"
        imageStyle={{ borderRadius: 16, opacity: 0.8 }}
      >
        <View className="absolute inset-0 justify-end items-center mb-4">
          <Text className="text-white font-bold text-xl">{name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RoutineTile;
