import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ActivityIndicator, 
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase/firebaseConfig';

const AddContactScreen = () => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission required', 'You need to allow access to your photos to upload an image.');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const uploadImage = async (uri) => {
    try {
      const storage = getStorage();
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `contactImages/${Date.now()}-${filename}`);
      
      // Convert image to blob
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Upload image
      const snapshot = await uploadBytes(storageRef, blob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleCreateContact = async () => {
    if (!name.trim()) {
      Alert.alert('Missing information', 'Please enter a name for your contact.');
      return;
    }
    
    try {
      setLoading(true);
      
      // Upload image if selected
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }
      
      // Add contact to Firestore
      const contactsCollection = collection(db, 'contacts');
      await addDoc(contactsCollection, {
        name,
        notes,
        imageUrl,
        createdAt: new Date(),
      });
      
      // Navigate back to relationships screen
      Alert.alert('Success', 'Contact added successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error creating contact:', error);
      Alert.alert('Error', 'Failed to create contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RELATIONSHIPS</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>28</Text>
          <Text style={styles.dayText}>Tue</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Ionicons name="camera" size={32} color="#8833FF" />
              <Text style={styles.uploadText}>Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="How are you related..."
          placeholderTextColor="#888"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateContact}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.createButtonText}>Create</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8833FF',
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  dayText: {
    fontSize: 14,
    color: '#aaa',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  imagePickerButton: {
    marginVertical: 20,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderStyle: 'dashed',
  },
  uploadText: {
    color: '#8833FF',
    marginTop: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    width: '100%',
    backgroundColor: '#FF33CC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
  },
});

export default AddContactScreen;