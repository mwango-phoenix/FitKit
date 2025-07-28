import { View, Text, TextInput } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  onPress?: () => void;
}

const SearchBar = ({ onPress }: Props) => {
  return (
    <View className="flex-row items-center justify-center px-5 py-2 bg-darkBackground rounded-full">
      <Ionicons name="search" size={20} color="gray"/>
      <TextInput
        onPress={onPress}
        placeholder="Search"
        className="flex-1 ml-2"
        value=""
        onChangeText={() => {}}
        placeholderTextColor={"gray"}
      />
    </View>
  );
};

export default SearchBar;
