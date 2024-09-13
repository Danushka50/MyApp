// authReducer.ts
import { SET_USER } from "./actionTypes";

interface user {
  email: string;
  phoneNumber: string;
}

interface AuthState {
  user: user;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  user: { email: "", phoneNumber: "" },
  isAuthenticated: false,
  token: null,
};

export const authReducer = (state = initialState, action: any) => {
  console.log(action.user);
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        token: action.payload,
      };
    default:
      return state;
  }
};
