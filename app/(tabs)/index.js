import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Notification from './notificationscreen'

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Apply the correct style for top navigation */}
      <View style={styles.topnav}>
        <Ionicons name="menu-outline" size={32} color="#ffffff" />
        <Ionicons name="notifications-outline" size={32} color="#ffffff" />
      </View>
      <Text style={styles.text}>Edit app/index.tsx to edit this</Text>
      <Link href="/notes" style={styles.button}>Go to Notes screen</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center", // Align child items vertically
    alignItems: "center", // Align child items horizontally
  },
  text: {
    color: "#ffffff",
  },
  button: {
    color: "#ffffff",
    padding: 10,
    margin: 10,
    backgroundColor: "#333333",
    borderRadius: 5,
  },
  topnav: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    width: "100%",
    // paddingHorizontal: 20, 
    // paddingVertical: 10, 
  },
});
