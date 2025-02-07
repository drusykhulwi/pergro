import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#4FCF22",
                headerStyle: { backgroundColor: "#000000" },
                headerTitleStyle: { color: "#FFFFFF" },
                headerShadowVisible: false,
                headerTintColor: "#FFFFFF",
                tabBarStyle: { backgroundColor: "#1E1E1E" },
            }}
        >
            {/* Home Screen */}
            <Tabs.Screen 
                name="index"
                options={{ 
                    title: '', 
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={30} />
                    ),
                }}
            />

            {/* Floating Add Button */}
            <Tabs.Screen 
                name="notificationscreen" // This should match the file inside the app/(tabs)/add.tsx or add.js
                options={{
                    title: '',
                    tabBarButton: (props) => <CustomAddButton {...props} />,
                }}
            />

            {/* Notes Screen */}
            <Tabs.Screen 
                name="notes" 
                options={{ 
                    title: '',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'create' : 'create-outline'} color={color} size={30} />
                    ),
                }}   
            />
        </Tabs>
    );
}

// Custom Floating Plus Button
const CustomAddButton = ({ onPress }) => (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Ionicons name="add" size={30} color="black" />
    </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
    addButton: {
        width: 60,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: -25, // Floating above the tab bar
        alignSelf: "center",
        elevation: 5, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

