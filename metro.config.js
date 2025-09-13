// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure the resolver object exists
config.resolver = config.resolver || {};

// Add support for .cjs files
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

// Fix Firebase 'auth has not been registered' error
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
