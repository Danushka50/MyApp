import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import LoginScreen from "../screens/LoginScreen";
import Dashboard from "../screens/Dashboard";

const Stack = createStackNavigator();
const StackNavigator: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
