import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
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
    },
    button: {
      color: "#ffffff",
      padding: 10,
      margin: 10,
      backgroundColor: "#333333",
      borderRadius: 5,
    }
  })
