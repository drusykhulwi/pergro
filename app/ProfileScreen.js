import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/31336820/pexels-photo-31336820/free-photo-of-portrait-of-a-woman-in-nature-with-ivy-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
            style={styles.profileImage} 
          />
          <View style={styles.progressOverlay}>
            <Text style={styles.progressText}>78%</Text>
          </View>
        </View>
        <Text style={styles.profileName}>Charlene Macharlove</Text>
      </View>

      <View style={styles.scheduleContainer}>
        {[
          { icon: '⏰', label: 'Wake up', time: '08:00' },
          { icon: '☕', label: 'Break', time: '50min' },
          { icon: '😴', label: 'Sleep', time: '22:00' },
          { icon: '🍳', label: 'Breakfast', time: '08:40' },
          { icon: '🍽️', label: 'Lunch', time: '13:00' },
          { icon: '🍲', label: 'Dinner', time: '18:00' }
        ].map((item, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleIcon}>{item.icon}</Text>
            <Text style={styles.scheduleLabel}>{item.label}</Text>
            <Text style={styles.scheduleTime}>{item.time}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  progressOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  progressText: {
    color: 'white',
    fontSize: 12,
  },
  profileName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduleContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 15,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  scheduleIcon: {
    fontSize: 20,
    width: 30,
  },
  scheduleLabel: {
    color: 'white',
    flex: 1,
    marginLeft: 10,
  },
  scheduleTime: {
    color: '#888',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 120,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;