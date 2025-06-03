import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from 'frontend/app/(tabs)/camera.tsx';

// Mock the necessary modules
jest.mock('expo-camera', () => ({
  CameraView: ({ children, onBarcodeScanned }) => (
    <div onClick={() => onBarcodeScanned && onBarcodeScanned({ type: 'ean13', data: '1234567890123' })}>
      {children}
    </div>
  ),
  CameraType: {
    back: 'back',
    front: 'front',
  },
  useCameraPermissions: jest.fn().mockReturnValue([{ granted: true }, jest.fn()]),
}));

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      fatsecretClientId: 'test-client-id',
      fatsecretClientSecret: 'test-client-secret',
    },
  },
}));

// Mock expo-router hooks
jest.mock('expo-router', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useFocusEffect: jest.fn().mockImplementation((callback) => callback()),
}));

global.fetch = jest.fn();
global.btoa = jest.fn().mockReturnValue('mocked-encoded-credentials');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
});
