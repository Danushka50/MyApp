// Babel is used to transform JSX code into regular JavaScript code,
// as well as to transform other modern JavaScript features, such as
// arrow functions and destructuring assignments.

module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: ["react-native-reanimated/plugin"],
};
