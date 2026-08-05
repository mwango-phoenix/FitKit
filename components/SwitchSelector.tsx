import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SwitchSelector({ options, value, onChange }: Props) {
  return (
    <View className="flex-row bg-darkBackground rounded-lg w-64">
      {options.map((option) => {
        const isActive = value === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            className={`flex-1 py-2 rounded-lg items-center ${
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