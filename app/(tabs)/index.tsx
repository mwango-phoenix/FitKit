import SearchBar from "@/components/SearchBar";
import { ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RoutineList from "@/components/RoutineList";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 mt-5 px-5">
            <SearchBar />
            <RoutineList />
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
