import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  marginTop?: number;
}

export default function InputField({
  marginTop = 0,
  ...props
}: InputFieldProps) {
  return (
    <TextInput
      style={[styles.input, { marginTop }]}
      placeholderTextColor="#888"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#B9B8B8",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },
});
