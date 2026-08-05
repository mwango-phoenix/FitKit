
import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Calendar from "@/components/Calendar";

export default function ExerciseScreen() {
  return (
    <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 mt-5 px-5">
            <Calendar />
          </View>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}
