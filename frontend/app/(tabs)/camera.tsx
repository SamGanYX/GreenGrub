import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../components/camera_styles';
// Optional: Import Haptics for feedback on scan
// import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';

const { fatsecretClientId, fatsecretClientSecret } = Constants.expoConfig?.extra || {};

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);

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