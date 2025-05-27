
import { StyleSheet, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '../../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(false); // ✅ tracked in state

  useFocusEffect(
    useCallback(() => {
      const checkLogin = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setLoggedIn(!!token);
      };

      checkLogin();
    }, [])
  );

  const handleLogPress = () => {
    if (!loggedIn) {
      router.push('/login');
    } else {
      handleLogOut();
    }
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setLoggedIn(false);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GreenGrub</Text>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={handleLogPress}
        >
          <FontAwesome name="user" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>{loggedIn ? 'Log Out' : 'Log In'}</Text>
        </Pressable>

        {/*<Pressable
          style={styles.button}
          onPress={() => router.push('/camera')}
        >
          <FontAwesome name="camera" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Scan Product</Text>
        </Pressable>*/}
      </View>
    </View>
  );
}
