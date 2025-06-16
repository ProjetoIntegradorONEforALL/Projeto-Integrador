// app/index.tsx (Splash Screen)

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Importa o useRouter para navegação

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a tela de registro após 2 segundos
    const timer = setTimeout(() => {
      router.push("/splashScreen"); // Redireciona para a tela de registro
    }, 2000); // O delay é de 2 segundos

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu App</Text>
      <Text style={styles.subtitle}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Cor de fundo
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
  },
});
