import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from '../../components/styles';
import { router } from 'expo-router';
import { useFoodData } from '../datashare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define the Barcode interface
interface Barcode {
  id: number;
  userId: string;
  barcode: string;
  active: boolean;
}

export default function FoodListPage() {
  const preferences = ['Climate Score', 'Not Yet Ready'];

  const [selectedPreference, setSelectedPreference] = useState(preferences[0]);
  const [showOptions, setShowOptions] = useState(false);

  const [barcodes, setBarcodes] = useState<Map<number, Barcode>>(new Map()); // Use Barcode interface
  const [nutritionData, setNutritionData] = useState<any[]>([]); // Adjust type as needed

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
    const id = await AsyncStorage.getItem("userId");
    if (id) {
      try {
        const response = await axios.get(`http://13.59.176.110:8080/barcodes/user/${id}`);
        console.log("Fetched barcodes:", response.data);

        // Save fetched barcodes to state using the Barcode interface
        const newBarcodes = new Map<number, Barcode>(
          response.data.map((item: Barcode) => [item.id, { id: item.id, userId: id, barcode: item.barcode, active: true }])
        );
        setBarcodes(newBarcodes);

        const newNutritionData = []; // Initialize an array to hold nutrition data
        for (const item of response.data) {
          const ecoscoreResponse = await axios.get(`http://13.59.176.110:8080/openfood/barcode/${item.barcode}`);
          console.log(`Ecoscore for barcode ${item.barcode}:`, ecoscoreResponse.data);
          const parsedData = {
            product: {
              brands: ecoscoreResponse.data.product.brand_name || 'Unknown Brand',
              nutriments: ecoscoreResponse.data.product.nutriments || {},
              product_name: ecoscoreResponse.data.product.product_name || 'Unknown Product',
              code: ecoscoreResponse.data.product.code || item.barcode,
              ecoscore_grade: ecoscoreResponse.data.product.ecoscore_grade || 'unknown',
              ecoscore_score: ecoscoreResponse.data.product.ecoscore_score || null,
              ecoscore_data: ecoscoreResponse.data.product.ecoscore_data || { agribalyse: { co2_total: null, co2_total_unit: null } }
            }
          };
          // Push the nutrition data into the array
          newNutritionData.push(parsedData);
        }
        setNutritionData(newNutritionData);
      } catch (error) {
        console.error("Error fetching barcodes:", error);
      }
    }
  };

  useEffect(() => {
    fetchBarcodes();
  }, []);

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
        {Array.from(barcodes.entries()).map(([key, { id, barcode }]) => {
          // Find the corresponding nutrition data for the barcode
          const nutritionItem = nutritionData.find(item => item.product.code === barcode);
          const productName = nutritionItem ? nutritionItem.product.product_name : 'Unknown Product'; // Fallback if not found
          const ecoscoreGrade = nutritionItem ? nutritionItem.product.ecoscore_grade : 'N/A'; // Fallback if not found
          const ecoscoreScore = nutritionItem ? nutritionItem.product.ecoscore_score : 'N/A'; // Fallback if not found

          return (
            <View key={key} style={styles.foodItem}>
              <Text>Product Name: {productName}</Text> {/* Display product name instead of barcode */}
              <Text>Ecoscore Grade: {ecoscoreGrade}</Text> {/* Display ecoscore grade */}
              <Text>Ecoscore Score: {ecoscoreScore}</Text> {/* Display ecoscore score */}
              <Button title="Delete/Remove" onPress={() => handleRemove(id)}/>
            </View>
          );
        })}
      </View>
  {/*
      <TouchableOpacity style={styles.button} onPress={handlePreference}>
        <Text style={styles.buttonText}> {'Change Preference'} </Text>
      </TouchableOpacity>*/}
      <TouchableOpacity style = { styles.button } onPress = { handleFinish }>
        <Text style={styles.buttonText}> {'Finish and Compare'} </Text>
      </TouchableOpacity>
    </View>
  );
};