import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Base64 } from "js-base64";
import CheckBox from "@react-native-community/checkbox";

import CustomTextInput from "../components/CustomTextInput";
import { fetchUserData } from "../api/webApi";
import { setRememberMe, setUser } from "../redux/auth/actionCreators";
import { validateEmail } from "../helper";

interface Props {
  navigation: any;
}

/**
 * LoginScreen component handles user login and authentication.
 *
 * This component allows users to input their email and password, handle form submission,
 * and manage the "Remember Me" option. It also interacts with Redux for state management
 * and uses `redux-persist` for persistence.
 *
 * @param {Props} props - The component props including navigation object.
 *
 * @returns {React.FC} - The rendered LoginScreen component.
 */
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // Retrieve "Remember Me" status from Redux store
  const isRememberMe = useSelector((state: any) => state.auth.isRememberMe);

  // Local state for email, password, error message, and checkbox toggle
  const [email, setEmail] = useState("Sincere@april.biz");
  const [password, setPassword] = useState("TGVhbm5lIEdyYWhhbQ==");
  const [error, setError] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(isRememberMe);

  // Redux dispatch function
  const dispatch = useDispatch();

  /**
   * Handles user login by validating input and fetching user data.
   */
  const handleLogin = () => {
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    if (validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    fetchUserData(
      "https://jsonplaceholder.typicode.com/users",
      successCallback,
      errorCallback
    );
  };

  /**
   * Success callback for user data fetch. Validates user credentials and dispatches actions.
   *
   * @param {any} data - The fetched user data.
   */
  const successCallback = (data: any) => {
    // Find a user with the matching email
    const user = data.find((u: any) => u.email === email);

    if (user) {
      let userEmail = user.email;
      let userName = user.name;
      let key = Base64.decode(password);

      if (key === userName && userEmail === email) {
        dispatch(setUser(user)); // Dispatch action to set user
        navigation.navigate("Dashboard"); // Navigate to Dashboard
      } else {
        Alert.alert("Error", "Invalid details");
      }
    } else {
      Alert.alert("Error", "User login failed.");
    }
  };

  /**
   * Error callback for user data fetch. Displays an error alert.
   *
   * @param {any} error - The error encountered during fetch.
   */
  const errorCallback = (error: any) => {
    Alert.alert("Error", "User login failed. Please check the details");
  };

  /**
   * Updates email state on text input change.
   *
   * @param {string} text - The new email text.
   */
  const onEmailChanged = (text: string) => {
    setError("");
    setEmail(text);
  };

  /**
   * Updates password state on text input change.
   *
   * @param {string} text - The new password text.
   */
  const onPasswordChanged = (text: string) => {
    setError("");
    setPassword(text);
  };

  /**
   * Handles the "Remember Me" checkbox toggle change.
   *
   * @param {boolean} value - The new checkbox value.
   */
  const onToggleValueChange = (value: boolean) => {
    setToggleCheckBox(value);
    dispatch(setRememberMe(value)); // Dispatch action to update "Remember Me" state
  };

  /**
   * Renders the text input fields for email and password.
   *
   * @returns {JSX.Element} - The rendered text input fields.
   */
  const renderTextInputs = () => {
    return (
      <View>
        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={onEmailChanged}
        />
        <CustomTextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={onPasswordChanged}
        />
      </View>
    );
  };

  /**
   * Renders error message if any error exists.
   *
   * @returns {JSX.Element | null} - The rendered error message or null.
   */
  const renderError = () => {
    return error ? <Text style={styles.errorText}>{error}</Text> : null;
  };

  /**
   * Renders the "Remember Me" checkbox and label.
   *
   * @returns {JSX.Element} - The rendered "Remember Me" checkbox and label.
   */
  const renderRememberMe = () => {
    return (
      <View style={styles.rememberMeContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          tintColors={{ true: "orange" }}
          onValueChange={onToggleValueChange}
        />
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>
    );
  };

  /**
   * Renders the login button.
   *
   * @returns {JSX.Element} - The rendered login button.
   */
  const renderLoginButton = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../resources/background.png")}
        resizeMode="cover"
      >
        <View style={styles.textInputContainer}>
          {renderTextInputs()}
          {renderError()}
          {renderRememberMe()}
          {renderLoginButton()}
        </View>
      </ImageBackground>
    </View>
  );
};

// Styles for the LoginScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginHorizontal: 10,
    fontSize: 12,
  },
  button: {
    height: 50,
    borderColor: "orange",
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  loginButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  textInputContainer: {
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 50,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  rememberMeText: {
    fontSize: 14,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LoginScreen;
