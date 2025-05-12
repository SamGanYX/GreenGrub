const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this to fix Hermes issue with expo-router
config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [...process.env.RN_SRC_EXT.split(',').map(ext => ext.trim()), ...config.resolver.sourceExts]
  : config.resolver.sourceExts;

// Make sure to add this for web
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;