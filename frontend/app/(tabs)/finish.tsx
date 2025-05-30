import { useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import styles from '../../components/styles';
import { useFoodData } from '../datashare';

export default function FinishPage() {
  const { data, setData } = useFoodData();
  const [ userPref, setUserPref ] = useState<string>("Climate"); // get this from call to BACKEND: for now we'll hardcode it
  const [ climateScores, setClimateScores ] = useState<string[]>([]); // this will be filled in YEp

  // ON MOUNT, update user pref (setUserPref :D) from UserPref call to BACKEND
  for (const [_, json] of data) {
    const name = JSON.parse(json).food.food_name;
    console.log("skibkid gyatt ", name);
    climateScores.push(name);
  }

  // construct TEMPORARY list of scores that match current user preference



  return ( // bro why is everything hardcoded :D
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
    </View>
  );
}