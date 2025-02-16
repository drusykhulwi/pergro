import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function AddTask() { // ❌ No need to pass navigation as a prop
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");

  const navigation = useNavigation(); // ✅ Correctly get navigation

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        startTime,
        endTime,
        date: moment().format("YYYY-MM-DD"),
        userId: "user123",
        status: "pending",
        type: "one-time",
      });
      navigation.goBack(); // ✅ Correctly navigate back
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Task Title" style={styles.input} onChangeText={setTitle} />
      <TextInput placeholder="Description" style={styles.input} onChangeText={setDescription} />
      <TextInput placeholder="Start Time" style={styles.input} onChangeText={setStartTime} />
      <TextInput placeholder="End Time" style={styles.input} onChangeText={setEndTime} />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  input: { backgroundColor: "#2E2E2E", color: "#fff", padding: 10, margin: 10 },
  button: { backgroundColor: "#08A6EA", padding: 15, alignItems: "center", margin: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
