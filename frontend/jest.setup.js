// jest-setup.js
// Mock React Native components
jest.mock('react-native', () => ({
    Text: function(props) { return props.children; },
    View: function(props) { return props.children; },
  }));
  
  // Set up a global mock for useColorScheme hook results
  global.useColorScheme = () => 'light';