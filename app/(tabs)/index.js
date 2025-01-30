import { Text, View, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// import Notification from './notificationscreen';


export default function Index() {
  return (
    <View style={styles.container}>
      {/* Apply the correct style for top navigation */}
      <View style={styles.topnav}>
        <Ionicons name="menu-outline" size={32} color="#ffffff" />  <Ionicons name="notifications-outline" size={32} color="#ffffff" />
      </View>
      <Text style={styles.text}>What's up, Charlene</Text>
      <View>
        <Text>Tasks</Text>
        <Text>Grocery Shopping</Text>
        <Text>Next Task: Call Tom</Text>
        {/* <Image source={require('../../../assets/images/Polygon4.png')}/> */}
      </View>
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
    justifyContent: "center", 
    alignItems: "center", 
  },
  text: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: 'bold',
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
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
