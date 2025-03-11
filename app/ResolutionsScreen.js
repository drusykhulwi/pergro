// resolution.js (Resolution List Screen)
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function ResolutionScreen() {
  const router = useRouter();
  const [resolutions, setResolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResolutions();
  }, []);

  const fetchResolutions = async () => {
    try {
      setIsLoading(true);
      const resolutionQuery = query(
        collection(db, 'resolutions'), 
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(resolutionQuery);
      const resolutionsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setResolutions(resolutionsList);
    } catch (error) {
      console.error("Error fetching resolutions: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date to display - improved timestamp handling
  const formatDate = (date) => {
    if (!date) return '';
    
    try {
      let timestamp;
      if (typeof date === 'object' && date.seconds) {
        // Firestore Timestamp
        timestamp = new Date(date.seconds * 1000);
      } else if (date instanceof Date) {
        timestamp = date;
      } else if (typeof date === 'string') {
        timestamp = new Date(date);
      } else {
        return '';
      }
      
      return timestamp.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    } catch (error) {
      console.error("Date formatting error:", error);
      return '';
    }
  };

  // Navigate to create resolution screen
  const navigateToCreateResolution = () => {
    router.push('CreateResolutionScreen');
  };

  // Navigate to edit resolution screen
  const navigateToEditResolution = (resolutionId) => {
    router.push({
      pathname: 'CreateResolutionScreen',
      params: { resolutionId }
    });
  };

  const renderResolutionItem = ({ item, index }) => {
    // Generate color based on index
    const colorOptions = ['#FF3B30', '#FFC700', '#FF9500'];
    const color = colorOptions[index % colorOptions.length];
    
    return (
      <View style={styles.resolutionItemContainer}>
        <View style={styles.timelineContainer}>
          <View style={[styles.timelineDot, { backgroundColor: color }]} />
          {index < resolutions.length - 1 && <View style={styles.timelineLine} />}
        </View>
        
        <TouchableOpacity 
          style={styles.resolutionCard}
          onPress={() => navigateToEditResolution(item.id)}
        >
          <View style={styles.resolutionContent}>
            <Text style={styles.resolutionTitle}>{item.title || 'Untitled'}</Text>
            {item.dueDate && (
              <View style={styles.dateContainer}>
                <Ionicons name="calendar-outline" size={14} color="#888" />
                <Text style={styles.dateText}>{formatDate(item.dueDate)}</Text>
              </View>
            )}
          </View>
          <View style={[styles.resolutionIndicator, { backgroundColor: color }]} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={navigateToCreateResolution}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.headerTitle}>RESOLUTIONS</Text>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF3B30" />
        </View>
      ) : (
        <FlatList
          data={resolutions}
          renderItem={renderResolutionItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No resolutions yet. Tap 'ADD' to create one.
              </Text>
              <TouchableOpacity 
                style={styles.emptyAddButton}
                onPress={navigateToCreateResolution}
              >
                <Text style={styles.emptyAddButtonText}>ADD RESOLUTION</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 20,
  },
  backButton: {
    padding: 5,
  },
  addButton: {
    backgroundColor: '#333',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FF3B30',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  resolutionItemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineContainer: {
    alignItems: 'center',
    width: 20,
    marginRight: 10,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#333',
    marginTop: -2,
    marginBottom: -2,
  },
  resolutionCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resolutionContent: {
    flex: 1,
  },
  resolutionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#888',
    fontSize: 12,
    marginLeft: 5,
  },
  resolutionIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyAddButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  emptyAddButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});