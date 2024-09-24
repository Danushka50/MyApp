module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: [
    "./jestSetup.js", // Path to the mock setup file
    "@testing-library/jest-native/extend-expect",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-redux|react-native|@react-native|react-navigation|@react-navigation)/)",
    // Add other libraries if necessary
  ],
  moduleNameMapper: {
    "@react-native-async-storage/async-storage":
      "<rootDir>/__mocks__/@react-native-async-storage/async-storage.js",
  },
};
