import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Notes() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={32} color="#ffffff" />
      </TouchableOpacity>
      </View>
      <Text style={styles.text}>NO NOTIFICATION YET</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
      borderRadius: 3,
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
  