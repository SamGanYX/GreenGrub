// jest-setup.js
jest.mock('react-native', () => ({
    Text: function Text(props) { return props.children; },
    View: function View(props) { return props.children; },
    // Add other components as needed
  }));