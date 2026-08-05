import { View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ value, onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center justify-center px-5 py-2 bg-darkBackground rounded-full">
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        onPress={onPress}
        placeholder="Search"
        className="flex-1 ml-2"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"gray"}
      />
    </View>
  );
};

export default SearchBar;