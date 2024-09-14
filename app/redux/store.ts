import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For React Native
import { LOG_OUT } from "./user/actionTypes";
import { authReducer } from "./auth/reducer";
import { userReducer } from "./user/reducer";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key to store the state in storage
  storage: AsyncStorage, // Specify AsyncStorage for React Native
  whitelist: ["auth"], // Only persist the 'auth' reducer (whitelisted)
};

// Combine individual reducers into a root reducer
const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

// Root reducer to handle state resetting on logout
const rootReducer = (state: any, action: any) => {
  if (action.type === LOG_OUT) {
    state = undefined; // Clear the entire state on logout
  }
  return appReducer(state, action);
};

// Create a persisted reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist compatibility
    }),
});

// Create a persistor to manage the persistence
const persistor = persistStore(store);

// Export types for use in the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store and persistor
export { store, persistor };
