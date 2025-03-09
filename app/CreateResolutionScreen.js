// resolution/create.js (Create/Edit Resolution Screen)
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateResolutionScreen() {
  const router = useRouter();
  const { resolutionId } = useLocalSearchParams();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch resolution details if editing an existing resolution
  useEffect(() => {
    const fetchResolution = async () => {
      if (resolutionId) {
        try {
          const resolutionDoc = await getDoc(doc(db, 'resolutions', resolutionId));
          if (resolutionDoc.exists()) {
            const resolutionData = resolutionDoc.data();
            setTitle(resolutionData.title || '');
            setDescription(resolutionData.description || '');
            
            // Handle different date formats
            if (resolutionData.dueDate?.seconds) {
              setDate(new Date(resolutionData.dueDate.seconds * 1000));
            } else if (resolutionData.dueDate instanceof Date) {
              setDate(resolutionData.dueDate);
            }
          }
        } catch (error) {
          console.error("Error fetching resolution: ", error);
        }
      }
    };

    fetchResolution();
  }, [resolutionId]);

  // Function to save resolution to Firestore
  const saveResolution = async () => {
    try {
      setIsLoading(true);
      
      if (!title.trim()) {
        alert('Please enter a title for your resolution');
        setIsLoading(false);
        return;
      }

      const resolutionData = {
        title,
        description,
        dueDate: date,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (resolutionId) {
        // Update existing resolution
        await updateDoc(doc(db, 'resolutions', resolutionId), resolutionData);
      } else {
        // Add new resolution
        await addDoc(collection(db, 'resolutions'), resolutionData);
      }

      setIsLoading(false);
      router.back();
    } catch (error) {
      console.error("Error saving resolution: ", error);
      alert('Failed to save resolution. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.headerTitle}>RESOLUTIONS</Text>
      
      <View style={styles.createFormContainer}>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor="#888"
          />
        </View>
        
        <View style={styles.formGroup}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor="#888"
            multiline
          />
        </View>
        
        <TouchableOpacity 
          style={styles.dateSelector} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateTimeLabel}>Due Date:</Text>
          <Text style={styles.dateTimeDisplay}>
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.createButton, isLoading && styles.disabledButton]} 
            onPress={saveResolution}
            disabled={isLoading}
          >
            <Text style={styles.createButtonText}>CREATE</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerTitle: {
    color: '#FF3B30',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  createFormContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateSelector: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 15,
  },
  dateTimeLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  dateTimeDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  createButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 10,
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 14,
  },
});