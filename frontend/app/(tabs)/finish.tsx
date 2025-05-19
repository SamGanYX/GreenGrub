import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import styles from '../../components/styles';
import { router } from 'expo-router';

export default function FinishPage() {
  const climateScores = [
    "1. Pasta Roni Chicken & Broccoli Linguine Mix 4.7 Ounce Paper Box : 4.03",
    "2. Pasta Roni Shells & White Cheddar 6.2 Ounce Paper Box: 4.12",
  ];
  const handleFoodList = () => {
    router.push('foodlist');
  };

  return (
    <View style={styles.container}>
      <Pressable
          style={styles.swapModeButton}
          onPress={handleFoodList}
        >
          <Text style={styles.buttonText}>Food List</Text>
        </Pressable>
      <Text style={styles.title}>Climate Scores:</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {climateScores.map((item, index) => (
          <Text key={index} style={styles.itemText}>
            {item}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}