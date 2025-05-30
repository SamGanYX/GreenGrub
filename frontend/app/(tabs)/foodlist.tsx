import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from '../../components/styles';
import { router } from 'expo-router';
import { useFoodData } from '../datashare';

export default function FoodListPage() {
  const preferences = ['Climate Score', 'Not Yet Ready'];

  const [selectedPreference, setSelectedPreference] = useState(preferences[0]);
  const [showOptions, setShowOptions] = useState(false);

  const { data, setData } = useFoodData();

  console.log("data entries:", Array.from(data.entries()));

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
    console.log("going to finish now");
    router.push('/finish');
  };

  const handleRemove = (gtin: string) => {
    // API call should be done here to BACKEND to remove the element there
    setData(data => {
      const newMap = new Map(data);
      newMap.delete(gtin);
      return newMap;
    });
  }

  const getFoodName = (jsonString: string) => {
    try {
      const foodData = JSON.parse(jsonString);
      if (foodData.food && foodData.food.food_name) {
        return foodData.food.food_name;
      }
      if (typeof foodData === 'string') {
        return foodData;
      }
      return 'CAN\'T FIND THE FOOD';
    } catch (error) {
      return jsonString;
    }
  };

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
        {Array.from(data.entries()).map(([key, value]) => (
          <View key={key} style={styles.foodItem}>
            <Text>Food Name: {getFoodName(value)}</Text>
            <Text>Barcode: {key}</Text>
            <Button title="Delete/Remove" onPress={() => handleRemove(key)}/> 
          </View>
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