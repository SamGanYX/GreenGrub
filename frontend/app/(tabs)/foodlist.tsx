import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Pressable} from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '../../components/styles';
import { router } from 'expo-router';

export default function FoodListPage() {
  // hardcoded!! uhoh!!! guys!!!
  const [data, setData] = useState(['Pasta Roni Chicken & Broccoli Linguine Mix, 4.7-Ounce Box', 'Pasta Roni Shells & White Cheddar 6.2 oz Box']); // realisitcally should be done by our new call

  const preferences = ['Climate Score', 'Not Yet Ready'];

  const [selectedPreference, setSelectedPreference] = useState(preferences[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (preference: string) => { // that's crazy why is this never called
    setSelectedPreference(preference);
    setShowOptions(false);
  };

  const handleScan = () => {
  };

  const handlePreference = () => {
    router.push('/preferences');
  };

  const handleFinish = () => {
    router.push('/finish');
  };

  const handleRemove = (index : number) => {
    // API call should be done here to BACKEND to remove the 
    console.log("before: ", data);
    setData(data => data.filter((_, i) => i !== index));
    console.log("after: ", data);
  }

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
          <div>
            <button onClick={() => handleRemove(index)}> DELETE/REMOVE </button> {/* I will add deleting functinality here */}
          </div>
        </Text>
      ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePreference}>
        <Text style={styles.buttonText}> {'Change Preference'} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}> {'Finish and Compare'} </Text>
      </TouchableOpacity>
      
    </View>
  );
};
