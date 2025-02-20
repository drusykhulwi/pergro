import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Firestore connection
import moment from "moment"; // For date formatting
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const task = () => {
  const [selectedDate, setSelectedDate] = useState(moment()); // Default: today
  const [tasks, setTasks] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const navigation = useNavigation();

  // 🔹 Generate Week Dates
  useEffect(() => {
    const startOfWeek = moment().startOf("week"); // Start of current week (Sunday)
    const days = [];
    for (let i = 0; i < 5; i++) {
      days.push(startOfWeek.clone().add(i, "days"));
    }
    setWeekDays(days);
  }, []);

  // 🔹 Fetch Tasks Based on Selected Date
  useEffect(() => {
    const fetchTasks = async () => {
      const formattedDate = selectedDate.format("MMMM Do"); // Example: "May 25th"
      const q = query(collection(db, "tasks"), where("date", "==", formattedDate));
      const querySnapshot = await getDocs(q);
      const fetchedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topnav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={32} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addButton}>
            <Ionicons name="add" size={24} color="#ffffff" />
            <Text style={styles.addText}>ADD</Text>
          </View>
        </TouchableOpacity>
        </View>
        <Text style={styles.textHeader}>TASKS</Text>
        <View style={styles.weekContainer}>
          {weekDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayItem,
                selectedDate.isSame(day, "day") && styles.selectedDay
              ]}
              onPress={() => setSelectedDate(day)}
            >
              <Text style={styles.dayText}>{day.format("ddd")}</Text>
              <Text style={styles.dateText}>{day.format("D")}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>  
      {/* 🔹 Calendar Header */}
      

      {/* 🔹 Task List */}
      <Text style={styles.heading}>TODAY'S TASKS</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskTime}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

// 🔹 Styles for UI
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000", 
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2E2E2E",
    height: 180,
    borderRadius: 20,
    top: -2
  },
  topnav: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    width: "100%",
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    flexDirection: "row",
    width: 80, 
    height: 40,
    justifyContent: "center", 
    alignItems: "center",
    borderColor: "#ffffff",
    borderWidth: 1, 
    borderRadius: 15,
    paddingHorizontal: 10, 
  },
  text: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 17,
  },
  textHeader: { 
    color: "#08A6EA", 
    fontSize: 30, 
    fontWeight: "600", 
    textAlign: "center" 
  },
  addText: { color: "#ffffff", fontSize: 16, marginLeft: 5 },
  weekContainer: { width: "90%", flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: "center", },
  dayItem: { alignItems: "center", padding: 10, borderRadius: 8 },
  selectedDay: { backgroundColor: "#08A6EA" },
  dayText: { color: "#AEAEAE", fontSize: 16 },
  dateText: { color: "#AEAEAE", fontSize: 18, fontWeight: "bold" },
  heading: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  taskItem: { backgroundColor: "#222", padding: 15, borderRadius: 10, marginVertical: 5 },
  taskTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  taskTime: { color: "#bbb", fontSize: 14 },
});

export default task;
