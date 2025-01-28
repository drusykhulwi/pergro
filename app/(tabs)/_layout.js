import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return(
        <Tabs
           screenOptions={{
            tabBarActiveTintColor: "#4FCF22",
            headerStyle:{
                backgroundColor: "#000000",
            },
            headerTitleStyle: { 
                color: '#FFFFFF' 
            },
            headerShadowVisible: false,
            headerTintColor: "#FFFFFF",
            tabBarStyle: {
                backgroundColor: "#1E1E1E",
            }
           }}
        >
            <Tabs.Screen 
                name="index"
                options={{ 
                    title: '', 
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={30}/>
                    ),
                }}
            />
            <Tabs.Screen 
                name="notes" 
                options={{ 
                    title: '',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'create' : 'create-outline'} color={color} size={30}/>
                    ),
                }}   
            />
        </Tabs>
    );
}