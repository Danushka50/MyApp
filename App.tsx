/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import StackNavigator from "./app/navigation/StackNavigation";
import { store, persistor } from "./app/redux/store";

/**
 * Main App component that wraps the application with necessary providers and settings.
 *
 * This component includes:
 * - SafeAreaView to ensure content is rendered within the safe area of a device.
 * - StatusBar to configure the appearance of the status bar.
 * - Provider from `react-redux` to make the Redux store available to the rest of the app.
 * - PersistGate from `redux-persist` to handle the loading state of persisted Redux store.
 * - StackNavigator as the main navigation component.
 *
 * @returns {React.JSX.Element} - The rendered App component.
 */
function App(): React.JSX.Element {
  // Determine if the app is in dark mode
  const isDarkMode = useColorScheme() === "dark";

  // Style for background based on color scheme
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StackNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

// Example styles (not used in the current component)
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
