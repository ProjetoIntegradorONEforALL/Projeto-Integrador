import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const logo = require("../assets/logoSplash.png");

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para o login após 2 segundos
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>
        <Text style={styles.eco}>eco</Text>
        <Text style={styles.vision}>Vision</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181D27",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "50%",
  },
  logo: {
    marginTop: 35,
    width: 150,
    height: 150,
    resizeMode: "contain",
    justifyContent: "center",
  },
  text: {
    fontSize: 35,
    color: "#fff",
    justifyContent: "center",
  },
  eco: {
    color: "#fff",
    fontFamily: "Roboto",
  },
  vision: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
  },
});
