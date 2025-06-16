// /app/alertas.tsx

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

const { width } = Dimensions.get("window");

export const options = {
  headerShown: false,
};

export default function Alertas() {
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const animation = useRef(new Animated.Value(-width * 0.7)).current;
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    Animated.timing(animation, {
      toValue: isSidebarVisible ? -width * 0.6 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(!isSidebarVisible));
  };

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
    toggleSidebar();
  };

  if (!fontsLoaded) return null;

  const alertas = [
    {
      id: 1,
      titulo: "Falha no Motor da Esteira",
      descricao: "Sensor 5 detectou interrupção no funcionamento da esteira principal.",
      status: "crítico",
      data: "15/06/2025 09:24",
    },
    {
      id: 2,
      titulo: "Nível de Resíduos Acima do Normal",
      descricao: "Sensor 3 indicou acúmulo excessivo na área de descarte.",
      status: "alerta",
      data: "15/06/2025 08:50",
    },
    {
      id: 3,
      titulo: "Funcionamento Estável",
      descricao: "Todos os sensores estão operando normalmente.",
      status: "normal",
      data: "15/06/2025 07:45",
    },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={styles.safeArea}>
        <Header title="Alertas Recentes" onMenuPress={toggleSidebar} />

        <View style={styles.container}>
          <ScrollView style={styles.alertList} contentContainerStyle={{ paddingBottom: 100 }}>
            {alertas.map((alerta) => (
              <View key={alerta.id} style={styles.alertItem}>
                <View style={styles.iconContainer}>
                  {alerta.status === "crítico" && (
                    <MaterialIcons name="warning" size={24} color="#D9534F" />
                  )}
                  {alerta.status === "alerta" && (
                    <FontAwesome5 name="exclamation-triangle" size={20} color="#F0AD4E" />
                  )}
                  {alerta.status === "normal" && (
                    <MaterialIcons name="check-circle" size={24} color="#5CB85C" />
                  )}
                </View>

                <View style={styles.alertText}>
                  <Text style={styles.title}>{alerta.titulo}</Text>
                  <Text style={styles.description}>{alerta.descricao}</Text>
                  <Text style={styles.date}>{alerta.data}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {isSidebarVisible && (
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={toggleSidebar}
          />
        )}

        <Animated.View
          style={[
            styles.sidebarContainer,
            {
              width: width * 0.6,
              transform: [{ translateX: animation }],
              height: "100%",
            },
          ]}
        >
          <Sidebar onNavigate={handleNavigate} onToggle={toggleSidebar} />
        </Animated.View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  alertList: {
    paddingBottom: 100,
  },
  alertItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 4,
  },
  alertText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#555",
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    fontFamily: "Roboto-Regular",
  },
  sidebarContainer: {
    position: "absolute",
    left: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    elevation: 10,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9,
  },
});
  