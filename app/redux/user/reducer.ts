import * as actionTypes from "./actionTypes";

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  isRememberMe: boolean;
}

const initialState: AuthState = {
  user: "",
  isAuthenticated: false,
  isRememberMe: false,
};

/**
 * Reducer function to handle authentication-related actions in the Redux store.
 *
 * This reducer manages user authentication state, including login, logout,
 * and "Remember Me" preferences.
 *
 * @param {AuthState} state - The current state of the authentication slice.
 * @param {any} action - The action object containing type and payload.
 *
 * @returns {AuthState} - The updated state based on the action type.
 */
export const userReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case actionTypes.LOG_OUT:
      return {
        ...state,
        user: {}, // Clear user information
        isAuthenticated: false, // Set authentication status to false
        isRememberMe: false, // Reset "Remember Me" flag
      };
    default:
      return state;
  }
};
