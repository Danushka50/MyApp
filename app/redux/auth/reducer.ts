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
 * @param {AuthState} state - The current state of the authentication slice.
 * @param {any} action - The action object containing type and payload.
 *
 * @returns {AuthState} - The updated state based on the action type.
 */
export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    case actionTypes.SET_REMEMBER_ME:
      return {
        ...state,
        isRememberMe: action.isRememberMe,
      };
    default:
      return state;
  }
};
