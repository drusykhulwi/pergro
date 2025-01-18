import { Text, View, StyleSheet } from "react-native";

export default function Notes() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NOTES</Text>
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
    }
  })