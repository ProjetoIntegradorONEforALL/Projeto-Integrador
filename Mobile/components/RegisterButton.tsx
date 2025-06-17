import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

export default function RegisterButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.buttonDisplay} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonDisplay: {
    width: "75%",
    padding: 8,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#28A745",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
  text: {
    color: "#28A745",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },
});
