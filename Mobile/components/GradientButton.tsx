import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  title: string;
  onPress: () => void;
}

export default function GradientButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <LinearGradient
        colors={["#69B578", "#254D32"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "75%",
    height: 40,
    borderRadius: 50,
  },
  gradient: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },
});
