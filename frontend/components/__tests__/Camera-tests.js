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
  // Set a default return value for the mock function
  useCameraPermissions: jest.fn().mockReturnValue([{ granted: true }, jest.fn()]),
  Camera: () => null,
}));
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../app/(tabs)/camera.tsx'; // TODO: This is currently changed because not entirely sure how the original one works. THis one hyperlinks in Vscode.. so i'll keep it for now.

// Mock the necessary modules


jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      fatsecretClientId: 'test-client-id',
      fatsecretClientSecret: 'test-client-secret',
    },
  },
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({}))
  };
});

global.fetch = jest.fn();
global.btoa = jest.fn().mockReturnValue('mocked-encoded-credentials');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when permissions are loading', () => {
    console.log(useCameraPermissions)
    require('expo-camera').useCameraPermissions.mockReturnValueOnce([null, jest.fn()]);
    console.log(useCameraPermissions)
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when permission is not granted', () => {
    require('expo-camera').useCameraPermissions.mockReturnValueOnce([{ granted: false }, jest.fn()]);
    const { getByText } = render(<App />);
    expect(getByText('We need your permission to show the camera')).toBeTruthy();
  });

  it('renders camera view correctly when permission is granted', () => {
    require('expo-camera').useCameraPermissions.mockReturnValueOnce([{ granted: true }, jest.fn()]);
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
