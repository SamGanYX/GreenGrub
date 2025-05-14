import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import styles from '../../components/styles';
import { router } from 'expo-router';

export default function PreferencesPage() {
  const preferences = ['Climate Score', 'Bulking Score', 'Cutting Score'];

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
          onPress={() => handlePreferencePress(pref)}
        >
          <Text style={styles.buttonText}>{pref}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}