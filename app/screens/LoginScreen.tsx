import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { Base64 } from "js-base64";
import CheckBox from "@react-native-community/checkbox";

import CustomTextInput from "../components/CustomTextInput";
import { fetchUserData } from "../api/webApi";
import { setUser } from "../redux/auth/actionCreators";

interface Props {
  navigation: any;
}
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("Sincere@april.biz");
  const [password, setPassword] = useState("TGVhbm5lIEdyYWhhbQ==");
  const [error, setError] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("Invalid email address");
      return;
    }

    fetchUserData(
      "https://jsonplaceholder.typicode.com/users",
      successCallback,
      errorCallback
    );
  };

  const successCallback = (data: any) => {
    // Find a user with the matching username
    const user = data.find((u: any) => u.email === email);

    if (user) {
      let userEmail = user.email; // Return the username if found
      let userName = user.name;
      let key = Base64.decode(password);

      if (key === userName && userEmail === email) {
        dispatch(setUser(user));
        navigation.navigate("Dashboard"); // Simulate successful login and navigate to Dashboard
      } else {
        Alert.alert("Error", "Invalid details");
      }
    } else {
      Alert.alert("Error", "User login failed.");
    }
  };

  const errorCallback = (error: any) => {
    Alert.alert("Error", "User login failed. Please check the details");
  };

  const onEmailChanged = (text: string) => {
    setError("");
    setEmail(text);
  };

  const onPasswordChanged = (text: string) => {
    setError("");
    setPassword(text);
  };

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

  const renderError = () => {
    return error ? <Text style={styles.errorText}>{error}</Text> : null;
  };

  const renderRememberMe = () => {
    return (
      <View style={styles.rememberMeContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          tintColors={{ true: "orange" }}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>
    );
  };

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
