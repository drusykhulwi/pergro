import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Notes() {
  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <Ionicons name="arrow-back-circle-outline" size={32} color="#ffffff" /><View><Text>ADD</Text><Ionicons name="add" size={32} color="#ffffff" /></View>
      </View>
      <Text style={styles.text}>NO NOTIFICATIONS YET</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#000000",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "#ffffff",
      fontSize: 18,
    },
    topnav: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    width: "100%",
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  })
  