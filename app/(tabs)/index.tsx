import SearchBar from "@/components/SearchBar";
import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RoutineList from "@/components/RoutineList";
import { useState } from "react";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 mt-5 px-5">
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            <RoutineList />
          </View>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}
