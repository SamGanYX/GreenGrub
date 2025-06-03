import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../components/styles';
import { useFoodData } from './datashare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function FinishPage() {
  const { data } = useFoodData();
  const [climateScores, setClimateScores] = useState<string[]>([]);
  const [sortedBarcodes, setSortedBarcodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPreference, setUserPreference] = useState<string | null>(null);

  // Extract climate scores from user food data (if needed)
  useEffect(() => {
    const names: string[] = [];
    for (const [_, json] of data) {
      try {
        const name = JSON.parse(json).food.food_name;
        names.push(name);
      } catch {
        names.push("Unknown");
      }
    }
    setClimateScores(names);
  }, [data]);

  // Fetch user food sorting preferences
  const fetchUserPreference = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (id) {
      try {
        const response = await axios.get(`http://13.59.176.110:8080/users/${id}/preference`);
        setUserPreference(response.data);
        console.log("User preference:", response.data);
      } catch (error) {
        console.error("Error fetching user preference:", error);
      }
    }
  };

  // Fetch sorted barcodes for user
  const fetchSortedBarcodes = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem("userId");
    if (id) {
      try {
        const response = await axios.get(`http://13.59.176.110:8080/barcodes/user/sorted/${id}`);
        setSortedBarcodes(response.data);
        console.log("Sorted barcodes:", response.data);
      } catch (error) {
        console.error("Error fetching sorted barcodes:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPreference();
    fetchSortedBarcodes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Scanned Items</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {climateScores.map((item, index) => (
          <Text key={index} style={styles.itemText}>
            {item}
          </Text>
        ))}
      </ScrollView>

      {loading ? (
        <Text style={styles.title}>Loading...</Text>
      ) : (
        <>
          <Text style={styles.title}>Sorted Foods ({userPreference})</Text>
          <ScrollView horizontal>
            <ScrollView contentContainerStyle={styles.listContainer}>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Product Name</Text>
                  {userPreference === 'LOW_CALORIE' && <Text style={styles.tableHeaderText}>Calories (100g)</Text>}
                  {userPreference === 'LOW_SUGAR' && <Text style={styles.tableHeaderText}>Sugars (100g)</Text>}
                  {userPreference === 'NUTRISCORE' && <Text style={styles.tableHeaderText}>Nutriscore</Text>}
                  {userPreference === 'ECOSCORE' && <Text style={styles.tableHeaderText}>Ecoscore</Text>}
                  {userPreference === 'PROTEIN' && <Text style={styles.tableHeaderText}>Proteins (100g)</Text>}
                </View>

                {sortedBarcodes.map(({ id, productName, ecoscoreScore, nutriscoreScore, energyKcal100g, sugars100g, proteins100g }) => (
                  <View key={id} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{productName || 'Unknown'}</Text>
                    {userPreference === 'LOW_CALORIE' && <Text style={styles.tableCell}>{energyKcal100g ?? 'N/A'}</Text>}
                    {userPreference === 'LOW_SUGAR' && <Text style={styles.tableCell}>{sugars100g ?? 'N/A'}</Text>}
                    {userPreference === 'NUTRISCORE' && <Text style={styles.tableCell}>{nutriscoreScore ?? 'N/A'}</Text>}
                    {userPreference === 'ECOSCORE' && <Text style={styles.tableCell}>{ecoscoreScore ?? 'N/A'}</Text>}
                    {userPreference === 'PROTEIN' && <Text style={styles.tableCell}>{proteins100g ?? 'N/A'}</Text>}
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        </>
      )}
    </View>
  );
}
