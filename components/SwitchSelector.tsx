import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SwitchSelector() {
  const [selected, setSelected] = useState("target");

  const options = ["target", "variations"];

  return (
    <View className="flex-row bg-gray-200 rounded-full p-1 w-64">
      {options.map((option) => {
        const isActive = selected === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => setSelected(option)}
            className={`flex-1 py-2 rounded-full items-center ${
              isActive ? "bg-secondary" : "bg-darkBackground"
            }`}
          >
            <Text
              className={`capitalize font-semibold ${
                isActive ? "text-light" : "text-gray-600"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
