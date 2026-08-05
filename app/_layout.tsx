import { Stack } from "expo-router";
import './global.css';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="exercises/[id]" options={{ title: "Exercise Details" }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}