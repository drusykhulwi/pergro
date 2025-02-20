import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Import Firestore
import AddTask from "./addtasks"; // Import AddTask component

const task = () => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // 🔹 Fetch tasks from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={32} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>TASKS</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addButton}>
            <Ionicons name="add" size={24} color="#ffffff" />
            <Text style={styles.addText}>ADD</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, item.type === "assigned" ? styles.assignedTask : styles.ownTask]}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskTime}>{item.time}</Text>
            <Text style={styles.taskDate}>{item.date}</Text>
          </View>
        )}
      />

      {/* Modal for Adding Task */}
      <Modal visible={modalVisible} animationType="slide">
        <AddTask onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { color: "#ffffff", fontSize: 20, fontWeight: "bold" },
  addButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#1e1e1e", padding: 10, borderRadius: 10 },
  addText: { color: "#ffffff", fontSize: 16, marginLeft: 5 },
  taskItem: { padding: 15, borderRadius: 10, marginVertical: 5 },
  assignedTask: { backgroundColor: "#0047AB" },
  ownTask: { backgroundColor: "#444" },
  taskTitle: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  taskTime: { color: "#ddd", fontSize: 14 },
  taskDate: { color: "#bbb", fontSize: 12 },
});

export default task;
