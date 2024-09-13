import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface Props {
  placeholder: string;
  value: any;
  secureTextEntry?: boolean;
  onChangeText: (value: string) => void;
}
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
