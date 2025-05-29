import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { styles } from '../../components/camera_styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Optional: Import Haptics for feedback on scan
// import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';
import { useFocusEffect } from 'expo-router';

const { fatsecretClientId, fatsecretClientSecret } = Constants.expoConfig?.extra || {};

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);

  const [isCameraActive, setIsCameraActive] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsCameraActive(true);
      return () => setIsCameraActive(false); // Cleanup when leaving screen
    }, [])
  );

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  const credentials = `${fatsecretClientId}:${fatsecretClientSecret}`;
  const encodedCredentials = btoa(credentials);

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function fetchAccessToken() {
    const credentials = `${fatsecretClientId}:${fatsecretClientSecret}`;
    const encodedCredentials = btoa(credentials);

    const res = await fetch('https://oauth.fatsecret.com/connect/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&scope=basic',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch access token');
    }

    const json = await res.json();
    return json.access_token;
  }

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    const gtin13 = data.padStart(13, '0'); // Ensure GTIN-13 format

    setScannedData(gtin13);
    console.log(`Scanned GTIN-13 barcode: ${gtin13}`);

    try {
      const token = await fetchAccessToken();
      const res = await fetch(
        `https://platform.fatsecret.com/rest/food/barcode/find-by-id/v1?barcode=${gtin13}&format=json`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Failed to fetch food data');

      const json = await res.json();
      console.log(json);

      const foodName = json?.food?.food_id || 'Unknown';
      // Alert.alert('Food Found', `ID: ${foodName}`);
    } catch (err) {
      console.error(err);
      // Alert.alert('Error', 'Unable to retrieve food information.');
    }
  };

  const handleSaveBarcode = async () => {
    const id = await AsyncStorage.getItem("userId");
    console.log(id);
    const barcodeToSave = {
      userId: id, // Corrected to await the promise
      barcode: scannedData,
      active: true, // or any logic to determine if it's active
  };

  try {
      const response = await fetch('http://localhost:8080/barcodes/add', { // Replace with your actual API URL
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(barcodeToSave),
      });

      if (!response.ok) {
          throw new Error('Failed to save barcode');
      }

      const savedBarcode = await response.json();
      console.log('Barcode saved:', savedBarcode);
      // Optionally, show a success message to the user
  } catch (error) {
      console.error('Error saving barcode:', error);
      // Optionally, show an error message to the user
  }
  };

  return (
    <View style={styles.container}>
      {isCameraActive && 
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "pdf417", "upc_a", "upc_e", "code128"],
          }}
        >
          {scannedData && (
            <View style={styles.scanResultOverlay}>
              <Text style={styles.scanResultText}>Scanned Data: {scannedData}</Text>
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => setScannedData(null)}
              >
                <Text style={styles.scanAgainButtonText}>Scan Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveBarcode}
              >
                <Text style={styles.saveButtonText}>Save Info</Text>
              </TouchableOpacity>
            </View>
          )}
        </CameraView>
      }
    </View>
  );
}