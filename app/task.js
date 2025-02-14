import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import moment from "moment";

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
      <Text style={styles.textHeader}>TASKS</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskTime}>
              {item.startTime} - {item.endTime}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  textHeader: { color: "#08A6EA", fontSize: 30, fontWeight: "600", textAlign: "center" },
  taskCard: { backgroundColor: "#2E2E2E", padding: 15, marginVertical: 10, borderRadius: 10 },
  taskTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  taskTime: { color: "#aaa", fontSize: 14 },
});
