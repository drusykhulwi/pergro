import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function NotesCreate() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Title Input */}
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#8E8E93"
          value={title}
          onChangeText={setTitle}
          clearButtonMode="while-editing"
        />

        {/* Notes Input */}
        <TextInput
          style={styles.notesInput}
          placeholder="Write your note here..."
          placeholderTextColor="#8E8E93"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={() => console.log("Saved", { title, content })}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", 
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 16,
    zIndex: 10,
    borderColor: "#ffffff",
    borderWidth: 1, 
    borderRadius: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60, // Space for back button
  },
  titleInput: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DEDEDE",
    color: "#000",
  },
  notesInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF", // iOS blue
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});