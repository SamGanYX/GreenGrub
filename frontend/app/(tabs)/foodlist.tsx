import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from '../../components/styles';
import { router } from 'expo-router';
import { useFoodData } from '../datashare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

// Define the Barcode interface
interface Barcode {
  id: number;
  userId: string;
  barcode: string;
  active: boolean;
  ecoscore_grade?: string;
  ecoscore_score?: string;
  nutriscore_grade?: string;
  nutriscore_score?: string;
  energy_kcal_100g?: string;
  sugars_100g?: string;
  proteins_100g?: string;
}

export default function FoodListPage() {
  const preferences = ['Climate Score', 'Not Yet Ready'];

  const [selectedPreference, setSelectedPreference] = useState(preferences[0]);
  const [showOptions, setShowOptions] = useState(false);

  const [barcodes, setBarcodes] = useState<Map<number, Barcode>>(new Map()); // Use Barcode interface
  const [nutritionData, setNutritionData] = useState<any[]>([]); // Adjust type as needed
  const [loading, setLoading] = useState(true); // Add loading state

  const handleSelect = (preference: string) => { // that's crazy why is this never called
    setSelectedPreference(preference);
    setShowOptions(false);
  };


  // IMPORTANT: This method should be called whenever we make an API call to backend to change any foodlists
  const handleUpdate = () => {
    // in theory, we should just have a GET here
    // and then a setData here
  }

  const handleFinish = () => {
    console.log("going to finish now");
    router.push('/finish');
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
              ecoscore_grade: item.ecoscore_grade,
              ecoscore_score: item.ecoscore_score,
              nutriscore_grade: item.nutriscore_grade,
              nutriscore_score: item.nutriscore_score,
              energy_kcal_100g: item['energy-kcal_100g'],
              sugars_100g: item.sugars_100g,
              proteins_100g: item.proteins_100g
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
        <Text style={styles.title}>Added Foods:</Text>

        <View>
          {Array.from(barcodes.entries()).map(([key, { id, barcode }]) => {
            const nutritionItem = nutritionData.find(item => item.product.code === barcode);
            const productName = nutritionItem ? nutritionItem.product.product_name : 'Unknown Product';

            return (
            <View key={key} style={styles.foodItem}>
              <Text style = {styles.itemText}>{productName}</Text>
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