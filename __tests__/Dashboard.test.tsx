import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { authReducer } from "../app/redux/auth/reducer"; // Adjust the path as necessary
import Dashboard from "../app/screens/Dashboard";

const store = createStore(authReducer);

test("renders Dashboard component correctly", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );

  expect(getByText("Welcome,")).toBeTruthy(); // Checking if welcome text is present
});
