/**
 * Fetches user data from a given API path and invokes callbacks based on the outcome.
 *
 * @param {string} apiPath - The endpoint URL to fetch data from.
 * @param {(data: any) => void} successCallback - Function to call when the data is successfully fetched. Receives the fetched data as a parameter.
 * @param {(error: any) => void} errorCallback - Function to call when an error occurs during the fetch. Receives the error as a parameter.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation completes. The promise does not return any value.
 */
export const fetchUserData = async (
  apiPath: string,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
): Promise<void> => {
  try {
    // Perform the fetch operation
    const response = await fetch(apiPath);

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response data as JSON
    const data = await response.json();

    // Call the success callback with the fetched data
    successCallback(data);
  } catch (error) {
    // Call the error callback with the caught error
    errorCallback(error);
  }
};
