import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from '../../components/styles';
import { router } from 'expo-router';
import { useFoodData } from '../datashare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Define the Barcode interface
interface Barcode {
  id: number;
  userId: string;
  barcode: string;
  productName: string;
  ecoscoreGrade?: string;
  ecoscoreScore?: string;
  nutriscoreGrade?: string;
  nutriscoreScore?: string;
  energyKcal100g?: string;
  sugars100g?: string;
  proteins100g?: string;
}

export default function FoodListPage() {
  const preferences = ['Climate Score', 'Not Yet Ready'];

  const [selectedPreference, setSelectedPreference] = useState(preferences[0]);
  const [showOptions, setShowOptions] = useState(false);

  const [barcodes, setBarcodes] = useState<Map<number, Barcode>>(new Map()); // Use Barcode interface
  const [nutritionData, setNutritionData] = useState<any[]>([]); // Adjust type as needed
  const [loading, setLoading] = useState(true); // Add loading state


  const handleFinish = () => {
    console.log("going to finish now");
    router.push('/finish');
  };

  const handlePreference = () => {
    console.log("going to preferences now");
    router.push('/preferences');

  };

  const handleRemove = async (id: number) => {
    try {
      await axios.post(`http://13.59.176.110:8080/barcodes/remove/${id}`);
      setBarcodes(barcodes => {
        const newMap = new Map(barcodes);
        newMap.delete(id);
        return newMap;
      });
    } catch (error) {
      console.error("Error removing barcode:", error);
    }
  };

  function shortenString(input: string, maxL: number) {
    if (input.length <= maxL) return input;
    return input.slice(0, maxL-3) + '...'; // 12 + 3 dots = 15 total
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

  const fetchBarcodes = async () => {
    setLoading(true); // Set loading to true before fetching
    const id = await AsyncStorage.getItem("userId");
    if (id) {
      try {
        const response = await axios.get(`http://13.59.176.110:8080/barcodes/user/${id}`);
        console.log("Fetched barcodes:", response.data);

        // Save fetched barcodes to state using the Barcode interface
        const newBarcodes = new Map<number, Barcode>(
          response.data.map((item: Barcode) => [
            item.id, 
            { 
              id: item.id, 
              userId: id, 
              barcode: item.barcode, 
              active: true,
              productName: item.productName,
              ecoscoreGrade: item.ecoscoreGrade,
              ecoscoreScore: item.ecoscoreScore,
              nutriscoreGrade: item.nutriscoreGrade,
              nutriscoreScore: item.nutriscoreScore,
              energyKcal100g: item.energyKcal100g,
              sugars100g: item.sugars100g,
              proteins100g: item.proteins100g
            }
          ])
        );
        setBarcodes(newBarcodes);
        
      } catch (error) {
        console.error("Error fetching barcodes:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    } else {
      setLoading(false); // Set loading to false if no userId
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBarcodes();
    }, [])
  );

  return (
    <View style={styles.container}>
    {loading ? (
      <Text>Loading...</Text>
    ) : (
      <>
        <TouchableOpacity style={[styles.swapModeButton, { marginTop: 20, flexDirection: 'row', alignItems: 'center' }]} onPress={handlePreference}>
          <Ionicons name="settings-sharp" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Preference</Text>
        </TouchableOpacity>
                <Text style={styles.title}>Added Foods:</Text>

        <View>
          {Array.from(barcodes.entries()).map(([key, { id, barcode, productName }]) => {
            const displayName = productName || 'Unknown Product';

            return (
            <View key={key} style={styles.foodItem}>
              <Text style = {styles.itemText}>{shortenString(productName, 30)}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemove(id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finish and Compare</Text>
        </TouchableOpacity>
      </>
    )}
  </View>
  );
};