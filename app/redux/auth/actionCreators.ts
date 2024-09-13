import * as actionTypes from "./actionTypes";

interface user {
  email: string;
  phoneNumber: number;
}

export const setUser = (user: user) => {
  return {
    type: actionTypes.SET_USER,
    user,
  };
};
