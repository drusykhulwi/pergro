// resolution/index.js (Resolution List Screen)
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function ResolutionsScreen() {
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching resolutions: ", error);
      setIsLoading(false);
    }
  };

  // Format date to display
  const formatDate = (date) => {
    if (!date) return '';
    let timestamp;
    if (date.seconds) {
      timestamp = new Date(date.seconds * 1000);
    } else if (date instanceof Date) {
      timestamp = date;
    } else {
      return '';
    }
    return timestamp.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
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
          onPress={() => router.push({
            pathname: 'resolution/create',
            params: { resolutionId: item.id }
          })}
        >
          <View style={styles.resolutionContent}>
            <Text style={styles.resolutionTitle}>{item.title}</Text>
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
          onPress={() => router.push('resolution/create')}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.headerTitle}>RESOLUTIONS</Text>
      
      <FlatList
        data={resolutions}
        renderItem={renderResolutionItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          !isLoading && (
            <Text style={styles.emptyText}>
              No resolutions yet. Tap 'ADD' to create one.
            </Text>
          )
        }
      />
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
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
});

