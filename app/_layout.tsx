import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)/(tabs)" options={{ headerShown: false, headerTitle: '' }} />
      <Stack.Screen name="platform" options={{ headerShown: false, headerTitle: '' }} />
    </Stack>
  );
}
