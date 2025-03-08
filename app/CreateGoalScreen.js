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
  const [pickerMode, setPickerMode] = useState('date'); // 'date' or 'time'
  const [delegate, setDelegate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Middle day (today)
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Function to format date to display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Function to generate calendar day numbers
  const generateDayNumbers = () => {
    const currentDate = new Date();
    const dayNumbers = [];
    
    for (let i = -2; i <= 2; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dayNumbers.push({
        day: daysOfWeek[date.getDay()],
        date: date.getDate(),
        fullDate: date,
        selected: i === 0
      });
    }
    
    return dayNumbers;
  };

  const daysList = generateDayNumbers();

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
            
            // Handle different date formats
            if (goalData.dueDate?.seconds) {
              setDate(new Date(goalData.dueDate.seconds * 1000));
            } else if (goalData.dueDate instanceof Date) {
              setDate(goalData.dueDate);
            }
            
            setDelegate(goalData.delegated || false);
          }
        } catch (error) {
          console.error("Error fetching goal: ", error);
        }
      }
    };

    fetchGoal();
  }, [goalId]);

  // Function to handle day selection in the calendar
  const handleDaySelection = (index) => {
    setSelectedDayIndex(index);
    
    // Update the date based on the selected day
    const newDate = new Date(daysList[index].fullDate);
    // Preserve the time from the current date
    newDate.setHours(date.getHours(), date.getMinutes());
    setDate(newDate);
  };

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

  // Handle date/time change
  const onDateTimeChange = (event, selectedDateTime) => {
    const currentDateTime = selectedDateTime || date;
    setShowDatePicker(false);
    
    if (pickerMode === 'date') {
      // If changing date, preserve the time from current date
      const newDate = new Date(currentDateTime);
      newDate.setHours(date.getHours(), date.getMinutes());
      setDate(newDate);
    } else {
      // If changing time, preserve the date but update the time
      const newDate = new Date(date);
      newDate.setHours(currentDateTime.getHours(), currentDateTime.getMinutes());
      setDate(newDate);
    }
  };

  // Function to show date picker
  const showDatePickerModal = (mode) => {
    setPickerMode(mode);
    setShowDatePicker(true);
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
        {daysList.map((day, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.dayContainer, 
              index === selectedDayIndex && styles.selectedDayContainer
            ]}
            onPress={() => handleDaySelection(index)}
          >
            <Text style={styles.dayText}>{day.date}</Text>
            <Text style={styles.weekdayText}>{day.day}</Text>
            {index === selectedDayIndex && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.dateTextContainer}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
      
      <View style={styles.createFormContainer}>
        <View style={styles.dateTimeSelectors}>
          <TouchableOpacity 
            style={styles.dateSelector} 
            onPress={() => showDatePickerModal('date')}
          >
            <Text style={styles.dateTimeLabel}>Date:</Text>
            <Text style={styles.dateTimeDisplay}>
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.timeSelector} 
            onPress={() => showDatePickerModal('time')}
          >
            <Text style={styles.dateTimeLabel}>Time:</Text>
            <Text style={styles.dateTimeDisplay}>
              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        </View>
        
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode={pickerMode}
            is24Hour={false}
            display="default"
            onChange={onDateTimeChange}
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
  dateTimeSelectors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateSelector: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginRight: 10,
  },
  timeSelector: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginLeft: 10,
  },
  dateTimeLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  dateTimeDisplay: {
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