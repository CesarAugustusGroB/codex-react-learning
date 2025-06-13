module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@ark-ui/react/(.*)$': '<rootDir>/src/__mocks__/ark-ui.js',
    '^@chakra-ui/react$': '<rootDir>/src/__mocks__/chakra-ui-react.js'
  },
};
