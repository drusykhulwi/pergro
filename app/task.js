import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

export default function task() {
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(selectedDate);
  }, [selectedDate]);

  const fetchTasks = async (date) => {
    try {
      const q = query(collection(db, "tasks"), where("date", "==", date));
      const querySnapshot = await getDocs(q);
      const fetchedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topnav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={32} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.addButton}>
            <Text style={styles.text}>ADD</Text>
            <Ionicons name="add" size={32} color="#ffffff" />
          </View>
        </View>
        <Text style={styles.textHeader}>TASKS</Text>
        <View style={styles.calendar}></View>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
          <View style={styles.time}>
            {item.startTime}
          </View>
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskTime}>
                {item.startTime} - {item.endTime}
              </Text>
            </View>
          </View>          
        )}
      />
    </View>
  );
}

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
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  time: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 400,
    textAlign: "center",
  },
  taskCard: { 
    backgroundColor: "#2E2E2E", 
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 10 
  },
  taskTitle: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  taskTime: { 
    color: "#aaa", 
    fontSize: 14 
  },
});
