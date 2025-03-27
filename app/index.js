import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Add any initial loading logic here
    const timer = setTimeout(() => {
      router.push('/Onboarding');
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PerGro</Text>
      <Text style={styles.tagline}>Your Personal Growth Companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#4FCF22', // Your app's green color
    fontSize: 48,
    fontWeight: 'bold',
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
});