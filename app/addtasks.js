import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Import Firestore

const addtasks = ({ onClose }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskDate, setTaskDate] = useState("");

  // 🔹 Function to Add Task to Firestore
  const handleSubmit = async () => {
    if (taskTitle && taskTime && taskDate) {
      try {
        await addDoc(collection(db, "tasks"), {
          title: taskTitle,
          time: taskTime,
          date: taskDate,
          type: "own", // Default task type
        });

        // Reset input fields
        setTaskTitle("");
        setTaskTime("");
        setTaskDate("");

        // Close modal after submission
        onClose();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Title"
        placeholderTextColor="#bbb"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Time (e.g., 10:00 AM - 12:00 PM)"
        placeholderTextColor="#bbb"
        value={taskTime}
        onChangeText={setTaskTime}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (e.g., May 25th)"
        placeholderTextColor="#bbb"
        value={taskDate}
        onChangeText={setTaskDate}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addText}>ADD TASK</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelText}>CANCEL</Text>
      </TouchableOpacity>
    </View>
  );
};

// 🔹 Styles for UI
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, justifyContent: "center" },
  heading: { color: "#ffffff", fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    backgroundColor: "#222",
    color: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addText: { 
    color: "#ffffff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  cancelButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelText: { 
    color: "#bbb", 
    fontSize: 16, 
  },
});

export default addtasks;
