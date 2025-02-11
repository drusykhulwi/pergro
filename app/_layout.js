import { Stack } from "expo-router";

export default function RootLayout() {
  return<Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="task" options={{ title: "Task" }}/>
    <Stack.Screen name="+not-found" />
  </Stack>;
}
