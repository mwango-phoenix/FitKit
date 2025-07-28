import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="exercises/[id]" options={{ title: 'Exercise Details' }} />
    <Stack.Screen name="(tabs)/exercise" options={{ title: 'Exercises' }} />
    <Stack.Screen name="(tabs)/planner" options={{ title: 'Planner' }} />
  </Stack>
}
