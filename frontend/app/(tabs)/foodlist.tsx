import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Pressable} from 'react-native';
import styles from '../../components/styles';
import { router } from 'expo-router';

export default function FoodListPage() {
  // hardcoded!! uhoh!!! guys!!!
  const [data, setData] = useState<string[]>(['Pasta Roni Chicken & Broccoli Linguine Mix, 4.7-Ounce Box', 'Pasta Roni Shells & White Cheddar 6.2 oz Box']); // realisitcally should be done by our new call

  const preferences = ['Climate Score', 'Not Yet Ready'];

  const [selectedPreference, setSelectedPreference] = useState(preferences[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (preference: string) => { // that's crazy why is this never called
    setSelectedPreference(preference);
    setShowOptions(false);
  };

  const handleScan = () => {  // lmao wtf is this
  };

  // IMPORTANT: This method should be called whenever we make an API call to backend to change any foodlists
  const handleUpdate = () => {
    // in theory, we should just have a GET here
    // and then a setData here
  }

  const handlePreference = () => {
    router.push('/preferences');
  };

  const handleFinish = () => {
    router.push('/finish');
  };

  const handleRemove = (index : number) => {
    // API call should be done here to BACKEND to remove the element there
    setData(data => data.filter((_, i) => i !== index));  // this should be REPLACED with the call to the backend
  }

  return (
    <View style={styles.container}>
      {/*}
      <Pressable
          style={styles.swapModeButton}
          onPress={handleScan}
        >
          <FontAwesome name="camera" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Scan More</Text>
        </Pressable>*/}
      <Text style={styles.title}>Added Foods:</Text> 
      <View>
      {data.map((item, index) => (
        <Text key={index} style={styles.foodItem}>
          {item}
          <Button title="Delete/Remove" onPress={() => handleRemove(index)}/> {/* I will add deleting functinality here */}
        </Text>
      ))}
      </View>
      {/*
      <TouchableOpacity style={styles.button} onPress={handlePreference}>
        <Text style={styles.buttonText}> {'Change Preference'} </Text>
      </TouchableOpacity>*/}
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}> {'Finish and Compare'} </Text>
      </TouchableOpacity>
      
    </View>
  );
};
