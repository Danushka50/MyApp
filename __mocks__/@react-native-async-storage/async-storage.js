const mockAsyncStorage = {
  getItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
  setItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
  removeItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
};

export default mockAsyncStorage;
