import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const ContactDetailsScreen = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      fetchContactDetails();
    }
  }, [id]);

  const fetchContactDetails = async () => {
    try {
      setLoading(true);
      const contactDoc = doc(db, 'contacts', id);
      const contactSnapshot = await getDoc(contactDoc);
      
      if (contactSnapshot.exists()) {
        setContact({
          id: contactSnapshot.id,
          ...contactSnapshot.data()
        });
      } else {
        Alert.alert('Error', 'Contact not found');
        router.back();
      }
    } catch (error) {
      console.error('Error fetching contact details:', error);
      Alert.alert('Error', 'Failed to load contact details');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async () => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${contact?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteDoc(doc(db, 'contacts', id));
              Alert.alert('Success', 'Contact deleted successfully');
              router.back();
            } catch (error) {
              console.error('Error deleting contact:', error);
              Alert.alert('Error', 'Failed to delete contact');
              setLoading(false);
            }
          }
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>CONTACT DETAILS</Text>
          <View style={{ width: 24 }} />
        </View>
        <ActivityIndicator size="large" color="#8833FF" style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>CONTACT DETAILS</Text>
        <TouchableOpacity onPress={() => router.push(`/edit-contact/${id}`)}>
          <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileSection}>
          {contact?.imageUrl ? (
            <Image source={{ uri: contact.imageUrl }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageText}>{contact?.name?.charAt(0)}</Text>
            </View>
          )}
          <Text style={styles.profileName}>{contact?.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.notesText}>
            {contact?.notes || 'No notes added for this contact.'}
          </Text>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.messageButton]}
            onPress={() => Alert.alert('Message', 'Messaging feature coming soon!')}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.callButton]}
            onPress={() => Alert.alert('Call', 'Calling feature coming soon!')}
          >
            <Ionicons name="call-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeleteContact}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete Contact</Text>
        </TouchableOpacity>
      </ScrollView>
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8833FF',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 16,
    color: '#eee',
    lineHeight: 24,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 6,
  },
  messageButton: {
    backgroundColor: '#8833FF',
  },
  callButton: {
    backgroundColor: '#33AAFF',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3366',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ContactDetailsScreen;