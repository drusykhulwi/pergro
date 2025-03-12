import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="task" options={{ title: "Tasks" }}/>
    <Stack.Screen name="goal" options={{ title: "Goals" }}/>
    <Stack.Screen name="ResolutionsScreen" options={{ title: "Resolutions" }}/>
    <Stack.Screen name="addtasks" options={{ title: "AddTasks" }}/>
    <Stack.Screen name="RelationshipsScreen" />
    <Stack.Screen name="add-contact" options={{ title: "Add Contact" }} />
    <Stack.Screen name="contact-details/[id]" 
      options={{
        title: "Contact Details",
        presentation: 'modal'
      }} 
    />
    <Stack.Screen name="+not-found" />
  </Stack>;
}