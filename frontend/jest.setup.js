// Mock any native modules, hooks, or components here
jest.mock('react-native/Libraries/Utilities/Appearance', () => ({
    getColorScheme: jest.fn(() => 'light'),
    addChangeListener: jest.fn(() => ({ remove: jest.fn() })),
  }));
  
  // Mock useColorScheme hook for all tests
  jest.mock('./components/useColorScheme', () => {
    return () => 'light';
  });