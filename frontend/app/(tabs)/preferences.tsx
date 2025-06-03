import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import styles from '../../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

export default function PreferencesPage() {
  const preferences = [
    { value: 'LOW_CALORIE', display: 'Low Calorie' },
    { value: 'HIGH_CALORIE', display: 'High Calorie' },
    { value: 'LOW_SUGAR', display: 'Low Sugar' },
    { value: 'NUTRISCORE', display: 'Nutriscore' },
    { value: 'ECOSCORE', display: 'Ecoscore' },
    { value: 'PROTEIN', display: 'Protein' }
  ];

  const handlePreferencePress = async (preference: string) => {
    try {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        const requestBody = { preference }; // Prepare the request body
        console.log("Sending request:", requestBody); // Log the request body
        await axios.put(`http://13.59.176.110:8080/preference/${id}`, requestBody);
        console.log(`Preference updated to: ${preference}`);
      } else {
        console.log("User ID not found.");
      }
    } catch (error) {
      console.error("Error updating preference:", error);
      Alert.alert("Failed to update preference.");
    }
    router.push('/foodlist');
  };

  const handleFoodList = () => {
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences:</Text>

      {preferences.map((pref, index) => (
        <TouchableOpacity
        key={index}
        style={styles.button}
        onPress={() => handlePreferencePress(pref.value)} // Use the value for handling
      >
        <Text style={styles.buttonText}>{pref.display}</Text>
      </TouchableOpacity>
      ))}
    </View>
  );
}