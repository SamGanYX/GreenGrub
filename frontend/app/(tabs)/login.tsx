import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../components/styles';

export default function LogInPage() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createNew, setCreateNew] = useState(false);


  useEffect(() => {
    const token = AsyncStorage.getItem('userToken');
    console.log(token);
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        navigation.navigate('camera');
      }
    };
    checkLoginStatus();
  }, []);

  const handleSubmit = () => {
    if (createNew) {
      handleCreateAccount();
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://18.118.128.63:8080/login', { username, password });
      console.log('Login successful:', response.data);
      await AsyncStorage.setItem('userToken', response.data.token);
      navigation.navigate('camera');
    } catch (error) {
      console.log('An error occurred during login:', error.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post('http://18.118.128.63:8080/create_account', { username, password });
      console.log("Account created successfully");
      await AsyncStorage.setItem('userToken', response.data.token);
      navigation.navigate('camera');
    } catch (error) {
      console.log('An error occurred while creating the account:', error.message);
    }
  };

  const handleSwapMode = () => {
    setCreateNew(!createNew);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.swapModeButton, { marginTop: 20 }]} onPress={handleSwapMode}>
          <Text style={styles.buttonText}>
            {createNew ? 'Login with Existing Account' : 'Create New Account'}
          </Text>
        </TouchableOpacity>
      <Text style={styles.title}>{createNew ? 'Create New Account' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{createNew ? 'Create Account' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'lightgreen', // Added background color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 200,
    textAlign: 'center',
    color: 'white', // Added text color
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    alignSelf: 'center',         // Makes button thinner horizontally
    justifyContent: 'center',
    paddingVertical: 20,         // Makes button thicker vertically
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '60%',                // Controls button width (adjust as needed)
    alignItems: 'center',
  },
  
  buttonText: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonGroup: {
    marginTop: 30, // Adds space between inputs and buttons
    alignItems: 'center',
  },
});
*/