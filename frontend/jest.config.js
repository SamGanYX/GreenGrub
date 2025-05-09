/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
};

module.exports = config;