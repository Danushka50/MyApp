import * as actionTypes from "./actionTypes";

/**
 * Action creator for logging out the user.
 *
 * This action is dispatched to clear the authentication state and log out the user.
 *
 * @returns {object} - The action object with type `LOG_OUT`.
 */
export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};
