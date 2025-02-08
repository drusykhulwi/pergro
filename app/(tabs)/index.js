import { Text, View, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// import Notification from './notificationscreen';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <Ionicons name="menu-outline" size={32} color="#ffffff" /><Ionicons name="notifications-outline" size={32} color="#ffffff" />
      </View>
      <Text style={styles.text}>What's up, Charlene</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.textContainer}>
            <Text style={styles.smalltext}>Tasks</Text>
            <Text style={styles.smalltext}>Grocery Shopping</Text>
            <Text style={styles.smalltext}>Next Task: Call Tom</Text>
          </View>
          <View style={styles.images}>
            <Image source={require('../../assets/images/Polygon4.png')}/>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.textContainer}>
            <Text style={styles.smalltext}>Goals</Text>
            <Text style={styles.smalltext}>Grocery Shopping</Text>
            <Text style={styles.smalltext}>Next Task: Call Tom</Text>
          </View>
          <View style={styles.images}>
            <Image source={require('../../assets/images/Polygon2.png')}/>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.textContainer}>
            <Text style={styles.smalltext}>Relationship</Text>
            <Text style={styles.smalltext}>Call Mum</Text>
          </View>
          <View style={styles.images}>
            <Image source={require('../../assets/images/Polygon3.png')}/>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.textContainer}>
            <Text style={styles.smalltext}>Resolutions</Text>
            <Text style={styles.smalltext}>Grocery Shopping</Text>
          </View>
          <View style={styles.images}>
            <Image source={require('../../assets/images/Polygon5.png')}/>
          </View>
        </View>
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
    fontWeight: 400,
    top: -75,
    left: -35,
  },
  smalltext: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 300,
    lineHeight: 18,
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
  progressBar: {
    width: 171,
    height: 226,
    justifyContent: "space-between"
  },
  progressContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    height: 460,
  },
  textContainer: {
    width: 150,
    height: 70,
  },
  images: {
    width: 171,
    height: 120,
  },
});
