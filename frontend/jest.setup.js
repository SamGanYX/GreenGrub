// jest-setup.js
jest.mock('react-native', () => ({
    Text: function(props) { return props.children; },
    View: function(props) { return props.children; },
    // Add other components as needed
  }));
  
  // Mock useColorScheme
  jest.mock('./useColorScheme', () => ({
    useColorScheme: () => 'light'
  }));
  
  // Silence act() warnings
  jest.mock('react-test-renderer', () => {
    const original = jest.requireActual('react-test-renderer');
    return {
      ...original,
      act: (callback) => {
        const result = callback();
        return result;
      },
    };
  });