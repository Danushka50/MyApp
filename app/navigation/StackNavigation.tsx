import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import LoginScreen from "../screens/LoginScreen";
import Dashboard from "../screens/Dashboard";

// Create a stack navigator
const Stack = createStackNavigator();

/**
 * StackNavigator component sets up navigation for the application using React Navigation.
 *
 * It conditionally renders either the LoginScreen or Dashboard based on the user's authentication state
 * and the "Remember Me" flag.
 *
 * @returns {React.FC} - The rendered StackNavigator component.
 */
const StackNavigator: React.FC = () => {
  // Retrieve authentication state and "Remember Me" status from Redux store
  const isRememberMe = useSelector((state: any) => state?.auth?.isRememberMe);
  const isAuthenticated = useSelector(
    (state: any) => state?.auth?.isAuthenticated
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {(!isRememberMe || !isAuthenticated) && (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerBackTitleVisible: false,
            headerLeft: () => <></>,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
