// module.exports = {
//   roots: ['<rootDir>/src'],
//   collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
//   setupFiles: ['react-app-polyfill/jsdom'],
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
//   testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
//     '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
//     '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
//   },
//   transformIgnorePatterns: [
//     '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
//     '^.+\\.module\\.(css|sass|scss)$',
//   ],
//   modulePaths: [],
//   moduleNameMapper: {
//     '^react-native$': 'react-native-web',
//     '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
//   },
//   moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
//   watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
//   resetMocks: true,
// };

module.exports = {
  roots: ['<rootDir>/src'],
  setupFiles: ['./scripts/jest/setup.js'],
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '.*\\.test\\.js$',
  collectCoverage: false,
  collectCoverageFrom: ['src/components/**/*.{js}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
