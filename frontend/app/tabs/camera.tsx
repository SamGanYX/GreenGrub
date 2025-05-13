import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
// Optional: Import Haptics for feedback on scan
// import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';

const { fatsecretClientId, fatsecretClientSecret } = Constants.expoConfig?.extra || {};

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [foodName, setFoodName] = useState<string | null>(null);

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
  
    setScannedData(data);
    console.log(`Scanned GTIN-13 barcode: ${gtin13}`);
  
    try {
      // Update the fetch call to the new API endpoint
      const res = await fetch(`http://192.168.64.1:8080/api/food/product/${gtin13}`, {
        method: 'GET',
        // No need for Authorization header
      });
  
      if (!res.ok) throw new Error('Failed to fetch food data');
  
      const json = await res.json();
      console.log(json);
  
      const food_name = json?.food?.food_id || 'Unknown';
      Alert.alert('Food Found', `ID: ${food_name}`);
      setFoodName(food_name);
    } catch (err) {
      console.error(err);
      // Alert.alert('Error', 'Unable to retrieve food information.');
    }
  };



  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        // Only set the scanner prop if we haven't scanned data yet
        onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          // Configure the barcode types you want to scan
          barcodeTypes: ["qr", "ean13", "ean8", "pdf417", "upc_a", "upc_e", "code128"],
        }}
      >
        {/* Overlay for Scanned Data and Scan Again Button */}
        {scannedData && (
          <View style={styles.scanResultOverlay}>
            <Text style={styles.scanResultText}>Scanned Data: {scannedData}</Text>
            <Text style={styles.scanResultText}>Scanned Food: {foodName}</Text>
            <TouchableOpacity
              style={styles.scanAgainButton}
              onPress={() => setScannedData(null)} // Reset state to scan again
            >
              <Text style={styles.scanAgainButtonText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Container for the Flip Camera Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Text style={styles.flipButtonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  bottomButtonContainer: {
    position: 'absolute', // Position buttons at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 20, // Add padding vertically
    paddingHorizontal: 64, // Add padding horizontally
    justifyContent: 'center', // Center the flip button
  },
  flipButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  flipButtonText: {
    fontSize: 18, // Slightly smaller font size
    fontWeight: 'bold',
    color: 'white',
  },
  scanResultOverlay: {
    position: 'absolute',
    bottom: 100, // Position above the flip button container
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', // Center items horizontally
  },
  scanResultText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  scanAgainButton: {
    backgroundColor: '#4CAF50', // A green color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});