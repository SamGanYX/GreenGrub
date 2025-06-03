import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import styles from '../../components/styles';
import { router } from 'expo-router';

export default function PreferencesPage() {
  const preferences = [
    { value: 'low_calorie', display: 'Low Calorie' },
    { value: 'high_calorie', display: 'High Calorie' },
    { value: 'low_sugar', display: 'Low Sugar' },
    { value: 'nutriscore', display: 'Nutriscore' },
    { value: 'ecoscore', display: 'Ecoscore' },
    { value: 'protein', display: 'Protein' }
  ];

  const handlePreferencePress = (preference: string) => {
    Alert.alert(`You pressed: ${preference}`);
    // You can replace this with navigation, API calls, etc.
    router.push('/foodlist')
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