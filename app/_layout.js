import { Stack } from "expo-router";

export default function RootLayout() {
  return<Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="task" options={{ title: "Tasks" }}/>
    <Stack.Screen name="goal" options={{ title: "Goals" }}/>
    <Stack.Screen name="+not-found" />
  </Stack>;
}
