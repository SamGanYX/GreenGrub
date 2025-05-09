// jest.config.js
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-navigation|@expo|expo-.*)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  injectGlobals: true,
  setupFiles: [],
  // This runs code before tests
  setupFilesAfterEnv: [],
  globals: {
    // Mock React Native components
    'react-native': {
      Text: jest.fn().mockImplementation(({children}) => children),
      View: jest.fn().mockImplementation(({children}) => children),
      // Add other RN components as needed
    }
  }
};

// Mock React Native directly in this file
jest.mock('react-native', () => {
  return {
    Text: jest.fn().mockImplementation(({children}) => children),
    View: jest.fn().mockImplementation(({children}) => children),
    // Add other RN components as needed
  };
});

// Mock any other dependencies your tests require