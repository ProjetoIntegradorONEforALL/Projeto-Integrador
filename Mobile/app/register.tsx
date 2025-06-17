import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import InputField from "../components/InputField";
import GradientButton from "../components/GradientButton";
import RegisterButton from "@/components/RegisterButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
    } else if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
    } else {
      try {
        const user = { name, email, password };
        await AsyncStorage.setItem("user", JSON.stringify(user));

        Alert.alert("Sucesso", "Conta criada com sucesso!", [
          { text: "OK", onPress: () => router.push("/login") },
        ]);
      } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        Alert.alert("Erro", "Não foi possível registrar o usuário.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.header}></View>
      </View>

      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subTitle}>Crie sua nova conta</Text>

      <View style={styles.containerLogin}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            marginTop={30}
          />
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <InputField
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <GradientButton title="Registrar" onPress={handleRegister} />
        <Text style={styles.ou}>ou</Text>
        <RegisterButton
          title="Entrar com o Google"
          onPress={() => alert("Google login")}
        />
      </View>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.esqueciSenha}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    position: "relative",
  },
  containerHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  header1: {
    position: "absolute",
    width: "100%",
    height: 300,
    backgroundColor: "#254D32",
  },
  header: {
    width: "200%",
    top: -250,
    left: -150,
    height: 650,
    backgroundColor: "#254D32",
    transform: [{ rotate: "-18deg" }],
  },
  containerLogin: {
    width: "85%",
    maxWidth: 500,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 40,
    bottom: 50,
    right: 45,
    color: "#FFF",
  },
  subTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#B9B8B8",
    right: 99,
    bottom: 50,
  },
  esqueciSenha: {
    color: "#69B578",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
    marginTop: 20,
  },
  ou: {
    color: "#B9B8B8",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
    marginVertical: 8,
  },
  inputContainer: {
    width: "75%",
    marginBottom: 25,
    position: "relative",
  },
});
