import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  // Immediate navigation without useEffect
  setTimeout(() => {
    router.replace('/(tabs)/home');
  }, 0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}