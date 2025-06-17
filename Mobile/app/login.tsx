  // app/login.tsx

  import React, { useState } from "react";
  import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
  import { useRouter } from "expo-router"; 
  import { useFonts } from "expo-font";
  import InputField from "../components/InputField";
  import GradientButton from "../components/GradientButton";
  import RegisterButton from "@/components/RegisterButton";
  import AsyncStorage from "@react-native-async-storage/async-storage";


  export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); 

    const [fontsLoaded] = useFonts({
      "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    });

    // Substitua o bloco de verificação de usuário por:

    const handleLogin = async () => {
      if (email && password) {
        try {
          const userData = await AsyncStorage.getItem("user");
          const savedUser = userData ? JSON.parse(userData) : null;

          if (
            savedUser &&
            email === savedUser.email &&
            password === savedUser.password
          ) {
            router.push("/dashboard");
          } else {
            alert("Email ou senha incorretos.");
          }
        } catch (error) {
          alert("Erro ao tentar fazer login.");
          console.error(error);
        }
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    };

    const checkStoredUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          console.log("Usuário salvo:", user);
          alert(`Usuário: ${user.name} (${user.email})`);
        } else {
          console.log("Nenhum usuário salvo.");
          alert("Nenhum usuário salvo.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };


    const handleRegister = () => {
      router.push("/register");
    };

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.header}></View>
        </View>
        <Text style={styles.title}>Bem-Vindo!</Text>
        <Text style={styles.subTitle}>Entre na sua conta</Text>
        <View style={styles.containerLogin}>
          <View style={styles.inputContainer}>
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              marginTop={30}
            />
            <InputField
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.esqueciSenha}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            
          </View>

          <GradientButton title="Entrar" onPress={handleLogin} />

          <Text style={styles.ou}>ou</Text>

          <RegisterButton title="Registrar" onPress={handleRegister} />

          <TouchableOpacity onPress={checkStoredUser}>
          <Text style={{
          color: "#B9B8B8",
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#B9B8B8", 
          paddingBottom: 2 
        }}>
          Ver usuário salvo
        </Text>
          </TouchableOpacity>

        </View>
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
      right: 65,
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
      fontSize: 13,
      fontWeight: "bold",
      fontFamily: "Roboto-Bold",
      position: "absolute",
      right: 0,
      bottom: 0,
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#69B578", 
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
