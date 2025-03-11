import React, { useState } from "react";
import { Tabs } from "expo-router";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Modal, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

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
                name="notificationscreen" 
                options={{
                    title: '',
                    tabBarButton: () => <CustomAddButton />,
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
const CustomAddButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add" size={30} color="black" />
            </TouchableOpacity>

            {/* Modal for Popup */}
            <Modal 
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.speechBubble}>
                        {/* Popup Menu Items */}
                        <TouchableOpacity 
                            style={styles.menuItem} 
                            onPress={() => {
                                setModalVisible(false);  // Close Modal
                            }}
                        >
                            <Ionicons name="clipboard-outline" size={24} color="#FF9900" />
                            <Link href="task" style={styles.menuText}>Tasks</Link>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => {
                                    setModalVisible(false);  // Close Modal
                                }}
                        >
                            <Ionicons name="refresh-outline" size={24} color="#FF9900" />
                            <Link href="goal" style={styles.menuText}>Goals</Link>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="glasses-outline" size={24} color="#FF9900" />
                            <Link href="ResolutionsScreen" style={styles.menuText}>Resolutions</Link>
                        </TouchableOpacity>

                        {/* Close Button */}
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={() => setModalVisible(false)}
                        >
                            <Ionicons name="close" size={28} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


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
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    speechBubble: {
        width: 220,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: "center",
        elevation: 10,
        position: "relative",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        width: "100%",
    },
    menuText: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: "600",
        color: "#333",
    },
    closeButton: {
        width: 50,
        height: 50,
        backgroundColor: "white",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: -25,
        borderWidth: 2,
        borderColor: "#eee",
    },
});

