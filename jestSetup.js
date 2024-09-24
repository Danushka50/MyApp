import "react-native-gesture-handler/jestSetup";

// Mock the RNGestureHandler module
jest.mock("react-native-gesture-handler", () => {
  return {
    GestureHandlerRootView: ({ children }) => children,
    Directions: {},
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
    State: {},
    PanGestureHandler: jest.fn(),
    TapGestureHandler: jest.fn(),
    FlingGestureHandler: jest.fn(),
    ForceTouchGestureHandler: jest.fn(),
    LongPressGestureHandler: jest.fn(),
    PinchGestureHandler: jest.fn(),
    RotationGestureHandler: jest.fn(),
    /* Other gesture handlers */
  };
});
