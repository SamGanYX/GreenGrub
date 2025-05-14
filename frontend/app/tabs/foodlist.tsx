import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Pressable} from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '../../components/styles';
import { router } from 'expo-router';

export default function FoodListPage() {
  const data = ['Pasta Roni Chicken & Broccoli Linguine Mix, 4.7-Ounce Box', 'Pasta Roni Shells & White Cheddar 6.2 oz Box'];

  const preferences = ['Climate Score', 'Not Yet Ready'];

  const [selectedPreference, setSelectedPreference] = useState(preferences[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (preference: string) => {
    setSelectedPreference(preference);
    setShowOptions(false);
  };

  const handleScan = () => {
  };

  const handlePreference = () => {
    router.push('preferences');
  };

  const handleFinish = () => {
  };

  return (
    <View style={styles.container}>
      <Pressable
          style={styles.swapModeButton}
          onPress={handleScan}
        >
          <FontAwesome name="camera" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Scan More</Text>
        </Pressable>
      <Text style={styles.title}>Added Foods:</Text> 
      <View>
      {data.map((item, index) => (
        <Text key={index} style={styles.foodItem}>
          {item}
        </Text>
      ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}> {'Change Preference'} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}> {'Finish and Compare'} </Text>
      </TouchableOpacity>
      
    </View>
  );
};
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  option: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  circle: {
    height: 20, width: 20, borderRadius: 10,
    borderWidth: 2, borderColor: '#007AFF', alignItems: 'center', justifyContent: 'center'
  },
  innerCircle: {
    height: 10, width: 10, borderRadius: 5, backgroundColor: '#007AFF'
  },
  label: { marginLeft: 12, fontSize: 16 },
});*/
