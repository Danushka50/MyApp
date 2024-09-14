import React from "react";
import { StyleSheet, TextInput } from "react-native";

// Define the properties that the CustomTextInput component will accept
interface Props {
  /**
   * Placeholder text that is displayed when the input is empty.
   */
  placeholder: string;

  /**
   * The current value of the input field.
   */
  value: any;

  /**
   * Optional boolean to toggle password visibility.
   * When true, the input will obscure text for secure entry.
   */
  secureTextEntry?: boolean;

  /**
   * Function to handle text changes in the input field.
   * It receives the new text value as a parameter.
   */
  onChangeText: (value: string) => void;
}

/**
 * A custom text input component with optional secure text entry.
 *
 * @param {Props} props - The properties passed to the component.
 * @returns {React.FC<Props>} - The rendered CustomTextInput component.
 */
const CustomTextInput: React.FC<Props> = ({
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  );
};

// Define the styles for the input field
const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 20,
    borderRadius: 30,
  },
});

export default CustomTextInput;
