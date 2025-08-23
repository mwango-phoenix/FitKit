import SearchBar from "@/components/SearchBar";
import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ExerciseList from "@/components/ExerciseList";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ExerciseScreen() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 mt-5 px-5">
            <SearchBar />
            <ExerciseList />
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
