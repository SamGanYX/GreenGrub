import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import styles from '../components/styles';
import { useFoodData } from './datashare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function FinishPage() {
  const [ climateScores, setClimateScores ] = useState<string[]>([]); // this will be filled in YEp
  const [sortedBarcodes, setSortedBarcodes] = useState<any[]>([]); // State to hold sorted barcodes
  const [loading, setLoading] = useState(true); // Loading state
  const [userPreference, setUserPreference] = useState<string | null>(null);

  const fetchSortedBarcodes = async () => {
    setLoading(true); // Set loading to true before fetching
    const id = await AsyncStorage.getItem("userId");
    if (id) {
      try {
        const response = await axios.get(`http://13.59.176.110:8080/barcodes/user/sorted/${id}`);
        console.log("Fetched sorted barcodes:", response.data);
        setSortedBarcodes(response.data); // Set the sorted barcodes
      } catch (error) {
        console.error("Error fetching sorted barcodes:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    } else {
      setLoading(false); // Set loading to false if no userId
    }
  };

    // Function to fetch user preference
    const fetchUserPreference = async () => {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        try {
          const response = await axios.get(`http://13.59.176.110:8080/users/${id}/preference`); // Adjust the endpoint as needed
          setUserPreference(response.data.preference); // Assuming the response contains a 'preference' field
          console.log(userPreference);
        } catch (error) {
          console.error("Error fetching user preference:", error);
        }
      }
    };
  

  useEffect(() => {
    fetchSortedBarcodes(); // Fetch sorted barcodes on component mount
    fetchUserPreference();
  }, []);

  return (
    <View style={styles.container}>
      {/*<Pressable
          style={styles.swapModeButton}
          onPress={handleFoodList}
        >
          <Text style={styles.buttonText}>Food List</Text>
        </Pressable>*/}
      <Text style={styles.title}>Climate Scores:</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {climateScores.map((item, index) => (
          <Text key={index} style={styles.itemText}>
            {item}
          </Text>
        ))}
      </ScrollView>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.title}>Sorted Foods:</Text>
          <ScrollView contentContainerStyle={styles.listContainer}>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Product Name</Text>
                <Text style={styles.tableHeaderText}>Ecoscore</Text>
                <Text style={styles.tableHeaderText}>Nutriscore</Text>
                <Text style={styles.tableHeaderText}>Calories (100g)</Text>
                <Text style={styles.tableHeaderText}>Sugars (100g)</Text>
                <Text style={styles.tableHeaderText}>Proteins (100g)</Text>
              </View>
              {sortedBarcodes.map(({ id, productName, ecoscoreScore, nutriscoreScore, energyKcal100g, sugars100g, proteins100g }) => (
                <View key={id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{productName || 'Unknown Product'}</Text>
                  <Text style={styles.tableCell}>{ecoscoreScore || 'N/A'}</Text>
                  <Text style={styles.tableCell}>{nutriscoreScore || 'N/A'}</Text>
                  <Text style={styles.tableCell}>{energyKcal100g || 'N/A'}</Text>
                  <Text style={styles.tableCell}>{sugars100g || 'N/A'}</Text>
                  <Text style={styles.tableCell}>{proteins100g || 'N/A'}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}