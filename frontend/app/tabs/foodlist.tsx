import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FoodListPage() {
  const navigation = useNavigation();

  const data = ['Nutela', 'apple'];

  const preferences = ['Climate Score', 'Not Yet Ready'];

  const [selected, setSelected] = useState<string | null>(null);

  const handleScan = () => {
    // goes back to camera page
    navigation.navigate('camera')
  };

  const handleFinish = () => {
    // goes to HYPOTHETICAL finish page
    navigation.navigate('finish')
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Added Foods:</Text> 
      <View>
      {data.map((item, index) => (
        <Text key={index} style={{ fontSize: 18, marginVertical: 4 }}>
          {item}
        </Text>
      ))}
      </View>
      <View>
        {preferences.map((preference, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => setSelected(preference)}
          >
            <View style={styles.circle}>
              {selected === preference && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.label}>{preference}</Text>
          </TouchableOpacity>
        ))}
        <Text style={{ marginTop: 20 }}>
          Selected: {selected ? selected : 'None'}
        </Text>
      </View>

      
      
      <Button title= 'Scan More Items' onPress={handleScan} />
      <Button title= 'Finish and Compare' onPress={handleFinish} />
    </View>
  );
};

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
});
