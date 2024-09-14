/**
 * Validates an email address using a regular expression.
 *
 * @param {string} email - The email address to be validated.
 *
 * @returns {boolean} - Returns `true` if the email address is invalid; otherwise, `false`.
 *
 * The regular expression used for validation checks that the email address:
 * - Starts with one or more alphanumeric characters or special characters (._%+-)
 * - Contains an "@" symbol
 * - Followed by one or more alphanumeric characters or hyphens
 * - Contains a period (.)
 * - Ends with a domain of at least two alphabetic characters
 *
 * Note: This function returns `true` for invalid email addresses and `false` for valid ones.
 */
export const validateEmail = (email: string): boolean => {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};
