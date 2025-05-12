import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogInPage() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {
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
      const response = await axios.post('http://localhost:8080/login', { username, password });
      console.log('Login successful:', response.data);
      await AsyncStorage.setItem('userToken', response.data.token);
      navigation.navigate('camera');
    } catch (error) {
      console.log('An error occurred during login:', error.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post('http://localhost:8080/create_account', { username, password });
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
      <Button title={createNew ? 'Create Account' : 'Login'} onPress={handleSubmit} />
      <Button title={createNew ?  'Login with Existing Account' : 'Create New Account'} onPress={handleSwapMode} />
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
});
