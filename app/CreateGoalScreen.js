import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Switch, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateGoalScreen() {
  const router = useRouter();
  const { goalId } = useLocalSearchParams();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [delegate, setDelegate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch goal details if editing an existing goal
  useEffect(() => {
    const fetchGoal = async () => {
      if (goalId) {
        try {
          const goalDoc = await getDoc(doc(db, 'goals', goalId));
          if (goalDoc.exists()) {
            const goalData = goalDoc.data();
            setTitle(goalData.title || '');
            setDescription(goalData.description || '');
            setDate(new Date(goalData.dueDate?.seconds * 1000 || Date.now()));
            setDelegate(goalData.delegated || false);
          }
        } catch (error) {
          console.error("Error fetching goal: ", error);
        }
      }
    };

    fetchGoal();
  }, [goalId]);

  // Function to save goal to Firestore
  const saveGoal = async () => {
    try {
      setIsLoading(true);
      
      if (!title.trim()) {
        alert('Please enter a title for your goal');
        setIsLoading(false);
        return;
      }

      const goalData = {
        title,
        description,
        dueDate: date,
        delegated: delegate,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (goalId) {
        // Update existing goal
        await updateDoc(doc(db, 'goals', goalId), goalData);
      } else {
        // Add new goal
        await addDoc(collection(db, 'goals'), goalData);
      }

      setIsLoading(false);
      router.back();
    } catch (error) {
      console.error("Error saving goal: ", error);
      alert('Failed to save goal. Please try again.');
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
      
      <Text style={styles.headerTitle}>GOALS</Text>
      
      <View style={styles.calendarContainer}>
        {['23', '24', '25', '26', '27'].map((day, index) => (
          <View 
            key={index} 
            style={[
              styles.dayContainer, 
              index === 2 && styles.selectedDayContainer
            ]}
          >
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.weekdayText}>
              {index === 0 ? 'Sun' : index === 1 ? 'Mon' : index === 2 ? 'Tue' : index === 3 ? 'Wed' : 'Thu'}
            </Text>
            {index === 2 && <View style={styles.selectedIndicator} />}
          </View>
        ))}
      </View>
      
      <View style={styles.dateTextContainer}>
        <Text style={styles.dateText}>May 2023</Text>
      </View>
      
      <View style={styles.createFormContainer}>
        <TouchableOpacity style={styles.timeSelector} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.timeDisplay}>
            Start: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - End: {new Date(date.getTime() + 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onDateChange}
          />
        )}
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter goal title"
            placeholderTextColor="#888"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter goal description"
            placeholderTextColor="#888"
            multiline
          />
        </View>
        
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Delegate</Text>
          <Switch
            value={delegate}
            onValueChange={setDelegate}
            trackColor={{ false: '#767577', true: '#f39c12' }}
            thumbColor={delegate ? '#fff' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.createButton, isLoading && styles.disabledButton]} 
            onPress={saveGoal}
            disabled={isLoading}
          >
            <Text style={styles.createButtonText}>{goalId ? 'UPDATE' : 'CREATE'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>cancel</Text>
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
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 10,
  },
  selectedDayContainer: {
    backgroundColor: '#FFC700',
    borderRadius: 5,
    paddingHorizontal: 12,
  },
  dayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekdayText: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  selectedIndicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#fff',
    marginTop: 2,
  },
  dateTextContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  dateText: {
    color: '#888',
    fontSize: 16,
  },
  createFormContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  timeSelector: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
  },
  timeDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
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