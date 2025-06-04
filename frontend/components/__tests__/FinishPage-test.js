import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import FinishPage from '../../app/finish'; // ⬅️ Update this path
import { useFoodData } from '../../app/datashare'; // ⬅️ Update this path
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from 'expo-router';

// Mocks
jest.mock('../../app/datashare', () => ({
  useFoodData: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('axios');

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useNavigation: jest.fn(() => ({
    setOptions: jest.fn(),
  })),
}));

describe('FinishPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders scanned items and sorted barcodes correctly', async () => {
    // Mock food data
    useFoodData.mockReturnValue({
      data: new Map([
        ['123', JSON.stringify({ food: { food_name: 'Apple' } })],
        ['456', JSON.stringify({ food: { food_name: 'Banana' } })],
      ]),
    });

    // Mock AsyncStorage
    AsyncStorage.getItem.mockResolvedValue('test-user-id');

    // First axios call: user preference
    axios.get.mockResolvedValueOnce({ data: 'LOW_SUGAR' });

    // Second axios call: sorted barcode data
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          barcode: '789',
          productName: 'Orange Juice',
          ecoscoreScore: 'B',
          nutriscoreScore: 'C',
          energyKcal100g: 42,
          sugars100g: 9.5,
          proteins100g: 0.8,
        },
      ],
    });

    const { getByText, queryByText } = render(<FinishPage />);

    // Loading state
    expect(getByText('Loading...')).toBeTruthy();

    // Wait for loading to finish
    await waitFor(() => {
      expect(queryByText('Loading...')).toBeNull();
      expect(getByText('Your Scanned Items')).toBeTruthy();
      expect(getByText('Apple')).toBeTruthy();
      expect(getByText('Banana')).toBeTruthy();
      expect(getByText('Sorted Foods (LOW_SUGAR)')).toBeTruthy();
      expect(getByText('1. Orange Juice')).toBeTruthy();
      expect(getByText('9.5')).toBeTruthy(); // sugars100g
    });
  });
});