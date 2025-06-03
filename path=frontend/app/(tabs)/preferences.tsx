import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Alert, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Preferences: React.FC = () => {
  const router = useRouter();

  const handlePreferencePress = async (preference: string) => {
    try {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        await axios.put(`http://13.59.176.110:8080/update/${id}`, null, {
          params: { preference }
        });
        Alert.alert(`Preference updated to: ${preference}`);
      } else {
        Alert.alert("User ID not found.");
      }
    } catch (error) {
      console.error("Error updating preference:", error);
      Alert.alert("Failed to update preference.");
    }
    router.push('/foodlist');
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default Preferences; 