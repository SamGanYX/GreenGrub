// setup.js

// Mock Expo Linking to prevent errors
jest.mock('expo-linking', () => ({
    ...jest.requireActual('expo-linking'),
    createURL: (path) => `myapp://${path}`,
  }));
  