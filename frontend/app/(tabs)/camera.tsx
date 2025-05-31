import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useCallback, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../components/camera_styles';
import * as SecureStore from 'expo-secure-store';
// Optional: Import Haptics for feedback on scan
// import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';
import { useFocusEffect } from 'expo-router';
import { useFoodData } from '../datashare';

const { fatsecretClientId, fatsecretClientSecret } = Constants.expoConfig?.extra || {};

export default function App() {
  const { data, setData } = useFoodData();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedGtin, setScannedGtin] = useState<string>("");
  const [foodDataJson, setJson] = useState<string>("");
  const [isCameraActive, setIsCameraActive] = useState(true);

  useFocusEffect(() => {
    setIsCameraActive(true);
    return () => setIsCameraActive(false);
  });

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

  /* Removed functionality to avoid the silly bug
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }*/

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
    console.log(`Scanned GTIN-13 barcode: ${gtin13}`);
    setScannedGtin(gtin13);
    try {
      const token = await fetchAccessToken();
      const res = await fetch(`http://localhost:8080/nutrition/barcode/${gtin13}`);

      if (!res.ok) throw new Error('Failed to fetch food data');

      const json = await res.json();
      console.log(json);
      setJson(JSON.stringify(json));
      // Alert.alert('Food Found', `ID: ${foodName}`);
    } catch (err) {
      console.error(err);
      // Alert.alert('Error', 'Unable to retrieve food information.');
    }
  };

  const handleSaveBarcode = async () => {  // why is this allat? why we writing hella? what does it even do
    setData(prev => new Map(prev).set(scannedGtin, foodDataJson));  // ADDS THE NEW BARCODE-FOOD PAIR TO OUR GLOBAL MAP THING
    const id = await SecureStore.getItemAsync("userId");
    console.log(id);
    const barcodeToSave = {  // what does this do: TODO Figure out 
      userId: id, // Corrected to await the promise
      barcode: scannedGtin,
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
          onBarcodeScanned={scannedGtin ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "pdf417", "upc_a", "upc_e", "code128"],
          }}
        >
          {scannedGtin && (
            <View style={styles.scanResultOverlay}>
              <Text style={styles.scanResultText}>Scanned Data: {foodDataJson}</Text>
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => {setScannedGtin(""); setJson("")}}
              >
                <Text style={styles.scanAgainButtonText}>Scan Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // style={styles.saveButton}  bro this style striaght up doesn't exist, so im removing it
                onPress={handleSaveBarcode}
              >
                <Text 
                 // style={styles.saveButtonText} again if you go to Styles, this is also striaght up not defined
                >Save Info</Text>
              </TouchableOpacity>
            </View>
          )}
        </CameraView>
      }
    </View>
  );
}