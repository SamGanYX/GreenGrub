import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles';
import { router } from 'expo-router';

export default function LogInPage() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createNew, setCreateNew] = useState(false);
  const [message, setMessage] = useState('');

  useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: 'Back',       // ✅ This is the label
        headerBackTitleVisible: true,  // Optional (shows the label)
      });
    }, [navigation]);

  useEffect(() => {
    const token = AsyncStorage.getItem('userToken');
    console.log(token);
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        router.push('/camera');
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
      const response = await axios.post('http://13.59.176.110:8080/login', { username, password });
      console.log('Login successful:', response.data);
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userId', response.data.userID);
      router.push('/camera');
    } catch (error) {
      console.log('An error occurred during login:', error.message);
      setMessage("Password or Username is wrong!");

    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post('http://13.59.176.110:8080/create_account', { username, password, "preference" : "ECOSCORE" });
      console.log("Account created successfully");
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userId', response.data.userID);
      router.push('/camera');
    } catch (error) {
      console.log('An error occurred while creating the account:', error.message);
      setMessage("That Username is taken!");
    }
  };

  const handleSwapMode = () => {
    setCreateNew(!createNew);
    setMessage("");
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
      <Text style = {styles.errorText}>{message}</Text>
    </View>
  );
};
