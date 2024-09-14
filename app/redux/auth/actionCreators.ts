import * as actionTypes from "./actionTypes";

/**
 * Action creator to set the user in the Redux store.
 *
 * @param {any} user - The user object to be stored in the Redux state.
 *
 * @returns {object} - The action object with type `SET_USER` and the user payload.
 */
export const setUser = (user: any) => {
  return {
    type: actionTypes.SET_USER,
    user,
  };
};

/**
 * Action creator to set the "Remember Me" flag in the Redux store.
 *
 * @param {boolean} isRememberMe - The flag indicating whether the user selected "Remember Me".
 *
 * @returns {object} - The action object with type `SET_REMEMBER_ME` and the isRememberMe payload.
 */
export const setRememberMe = (isRememberMe: boolean) => {
  return {
    type: actionTypes.SET_REMEMBER_ME,
    isRememberMe,
  };
};
