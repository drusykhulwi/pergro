import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function goal() {
  const router = useRouter();
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Function to format date to display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Function to generate calendar day numbers based on selected date
  const generateDayNumbers = () => {
    const dayNumbers = [];
    
    for (let i = -2; i <= 2; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      dayNumbers.push({
        day: daysOfWeek[date.getDay()],
        date: date.getDate(),
        fullDate: date,
        selected: i === 0
      });
    }
    
    return dayNumbers;
  };

  // Function to get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate days for the selected month and year
  const generateMonthDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const days = [];
    
    // Add empty spaces for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ date: '', empty: true });
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = new Date(selectedYear, selectedMonth, i);
      days.push({
        date: i,
        fullDate,
        isToday: isToday(fullDate),
      });
    }
    
    return days;
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Function to fetch goals from Firestore
  const fetchGoals = async () => {
    try {
      const goalsCollection = collection(db, 'goals');
      const goalsSnapshot = await getDocs(goalsCollection);
      const goalsList = goalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGoals(goalsList);
    } catch (error) {
      console.error("Error fetching goals: ", error);
    }
  };

  // Fetch goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // Navigate to create goal screen
  const navigateToCreateGoal = (goal) => {
    if (goal) {
      router.push({
        pathname: "/CreateGoalScreen",
        params: { goalId: goal.id }
      });
    } else {
      router.push("/CreateGoalScreen");
    }
  };

  // Handle day selection
  const handleDaySelection = (index, dayData) => {
    const newSelectedDate = dayData.fullDate;
    setSelectedDate(newSelectedDate);
    
    // Here you could fetch goals specific to this date if needed
  };

  // Handle month calendar day selection
  const handleMonthDaySelection = (day) => {
    if (!day.empty) {
      setSelectedDate(day.fullDate);
      setCalendarModalVisible(false);
    }
  };

  // Change month
  const changeMonth = (increment) => {
    let newMonth = selectedMonth + increment;
    let newYear = selectedYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  // Render goal item
  const renderGoalItem = ({ item, index }) => {
    const statusColors = {
      'Work on Landing page': '#3498db',
      'Apply to McKinsey': '#f39c12',
      'Finish My Assignment': '#95a5a6'
    };
    
    const getColor = () => {
      return statusColors[item.title] || '#95a5a6';
    };

    const getDueDate = () => {
      let date;
      if (item.dueDate?.seconds) {
        date = new Date(item.dueDate.seconds * 1000);
      } else if (item.dueDate instanceof Date) {
        date = item.dueDate;
      } else {
        date = new Date();
      }
      return `Due: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    };

    return (
      <TouchableOpacity 
        style={[styles.goalItem, index > 2 && styles.completedGoalItem]}
        onPress={() => navigateToCreateGoal(item)}
      >
        <View style={styles.goalContent}>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>{item.title}</Text>
            <Text style={styles.goalDate}>{getDueDate()}</Text>
          </View>
          <View style={[styles.statusIndicator, { backgroundColor: getColor() }]} />
        </View>
      </TouchableOpacity>
    );
  };

  // Use sample data for initial render, will be replaced by Firebase data
  const sampleGoals = [
    { id: '1', title: 'Work on Landing page', dueDate: { seconds: (Date.now() + 86400000) / 1000 } },
    { id: '2', title: 'Apply to McKinsey', dueDate: { seconds: (Date.now() + 172800000) / 1000 } },
    { id: '3', title: 'Finish My Assignment', dueDate: { seconds: (Date.now() + 259200000) / 1000 } },
    { id: '4', title: 'Finish My Assignment', dueDate: { seconds: (Date.now() + 345600000) / 1000 } },
    { id: '5', title: 'Finish My Assignment', dueDate: { seconds: (Date.now() + 432000000) / 1000 } },
  ];

  const dayNumbers = generateDayNumbers();
  const monthDays = generateMonthDays();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => navigateToCreateGoal()}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.headerTitle}>GOALS</Text>
      
      <View style={styles.calendarContainer}>
        {dayNumbers.map((day, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.dayContainer, 
              day.selected && styles.selectedDayContainer
            ]}
            onPress={() => handleDaySelection(index, day)}
          >
            <Text style={styles.dayText}>{day.date}</Text>
            <Text style={styles.weekdayText}>{day.day}</Text>
            {day.selected && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.dateTextContainer}
        onPress={() => setCalendarModalVisible(true)}
      >
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        <Ionicons name="calendar-outline" size={18} color="#888" style={styles.calendarIcon} />
      </TouchableOpacity>
      
      <View style={styles.timelineContainer}>
        <View style={styles.timeline} />
        <FlatList
          data={goals.length > 0 ? goals : sampleGoals}
          renderItem={renderGoalItem}
          keyExtractor={item => item.id}
          style={styles.goalsList}
        />
      </View>

      {/* Month Picker Modal */}
      <Modal
        visible={isCalendarModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCalendarModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarModalContent}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => changeMonth(-1)}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>{months[selectedMonth]} {selectedYear}</Text>
              <TouchableOpacity onPress={() => changeMonth(1)}>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekdayLabels}>
              {daysOfWeek.map((day, index) => (
                <Text key={index} style={styles.weekdayLabel}>{day}</Text>
              ))}
            </View>

            <View style={styles.monthDaysContainer}>
              {monthDays.map((day, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.monthDay,
                    day.empty && styles.emptyDay,
                    day.isToday && styles.todayDay,
                    selectedDate && day.fullDate && 
                    selectedDate.getDate() === day.fullDate.getDate() && 
                    selectedDate.getMonth() === day.fullDate.getMonth() && 
                    selectedDate.getFullYear() === day.fullDate.getFullYear() && 
                    styles.selectedMonthDay
                  ]}
                  onPress={() => handleMonthDaySelection(day)}
                  disabled={day.empty}
                >
                  <Text style={[
                    styles.monthDayText,
                    day.isToday && styles.todayDayText,
                    selectedDate && day.fullDate && 
                    selectedDate.getDate() === day.fullDate.getDate() && 
                    selectedDate.getMonth() === day.fullDate.getMonth() && 
                    selectedDate.getFullYear() === day.fullDate.getFullYear() && 
                    styles.selectedMonthDayText
                  ]}>
                    {day.date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  const today = new Date();
                  setSelectedDate(today);
                  setSelectedMonth(today.getMonth());
                  setSelectedYear(today.getFullYear());
                  setCalendarModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => setCalendarModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dateText: {
    color: '#888',
    fontSize: 16,
  },
  calendarIcon: {
    marginLeft: 8,
  },
  timelineContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  timeline: {
    width: 2,
    backgroundColor: '#FF3B30',
    marginRight: 15,
  },
  goalsList: {
    flex: 1,
  },
  goalItem: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  completedGoalItem: {
    opacity: 0.5,
  },
  goalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  goalDate: {
    color: '#888',
    fontSize: 12,
  },
  statusIndicator: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  calendarModalContent: {
    width: '90%',
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  calendarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekdayLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayLabel: {
    color: '#888',
    width: 40,
    textAlign: 'center',
  },
  monthDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  monthDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  monthDayText: {
    color: '#fff',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  todayDay: {
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 20,
  },
  todayDayText: {
    color: '#FF3B30',
  },
  selectedMonthDay: {
    backgroundColor: '#FFC700',
    borderRadius: 20,
  },
  selectedMonthDayText: {
    color: '#000',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: '#333',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});