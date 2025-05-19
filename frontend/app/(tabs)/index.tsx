
import { StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '../../components/styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GreenGrub</Text>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <FontAwesome name="user" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/camera')}
        >
          <FontAwesome name="camera" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Scan Product</Text>
        </Pressable>
      </View>
    </View>
  );
}
