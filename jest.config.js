module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["./jest.setup.js"], // Adjust the path if necessary
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testEnvironment: "node",
};
