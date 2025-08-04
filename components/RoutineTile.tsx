import { useFirebaseImage } from "@/services/useFirebaseImage";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

interface Props {
  id: string;
  name: string;
  img: string;
  onPress?: () => void;
}

const RoutineTile = ({ id, name, img, onPress }: Props) => {
  const { url: imageUrl, loading, error } = useFirebaseImage(img);
  return (
    <TouchableOpacity className="shadow-md my-3" onPress={onPress}>
      {loading || !imageUrl ? (
        <View className="w-full h-48 rounded-2xl bg-gray-300 justify-center items-center">
          <Text className="text-gray-700">Loading...</Text>
        </View>
      ) : (
        <ImageBackground
          source={{ uri: imageUrl }}
          className="w-full h-48 bg-darkBackground rounded-2xl opacity-90"
          imageStyle={{ borderRadius: 16, opacity: 0.8 }}
        >
          <View className="absolute inset-0 justify-end items-center mb-4">
            <Text className="text-white font-bold text-xl">{name}</Text>
          </View>
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
};

export default RoutineTile;
