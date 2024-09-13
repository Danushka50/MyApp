export const fetchUserData = async (
  apiPath: string,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  try {
    const response = await fetch(apiPath);
    const data = await response.json();
    successCallback(data);
  } catch (error) {
    errorCallback(error);
  }
};
