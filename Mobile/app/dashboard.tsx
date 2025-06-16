// /app/dashboard.tsx

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { useFonts } from "expo-font";
import { LineChart, PieChart } from "react-native-chart-kit";
import { useNavigation, useRouter } from "expo-router";
import GradientButton from "../components/GradientButton";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const animation = useRef(new Animated.Value(-width * 0.7)).current;
  const insets = useSafeAreaInsets();

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
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      {Platform.OS === "ios" && (
        <View style={[styles.statusBarBackground, { height: insets.top }]} />
      )}

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={Platform.OS === "ios"}
      />

      <SafeAreaView style={styles.safeArea}>
        <Header title="Dashboard" onMenuPress={toggleSidebar} />

        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          <Text style={styles.header}>Dashboard</Text>

          {/* Cards indicadores */}
          <View style={styles.cardContainer}>
            <View style={[styles.card, { backgroundColor: "#69B578" }]}>
              <Text style={styles.cardTitle}>Separado Hoje</Text>
              <Text style={styles.cardValue}>10 kg</Text>
            </View>
            <View style={[styles.card, { backgroundColor: "#A1C181" }]}>
              <Text style={styles.cardTitle}>Alertas Ativos</Text>
              <Text style={styles.cardValue}>3</Text>
            </View>
            <View style={[styles.card, { backgroundColor: "#FFB627" }]}>
              <Text style={styles.cardTitle}>Média Semanal</Text>
              <Text style={styles.cardValue}>14 kg</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Separação Diária por Material (Últimos 7 dias)
          </Text>
          <LineChart
            data={{
              labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
              datasets: [
                {
                  data: [20, 30, 25, 40, 50, 35, 45], // Exemplo: valores de separação por dia
                  strokeWidth: 2,
                },
              ],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: "#254D32",
              backgroundGradientFrom: "#69B578",
              backgroundGradientTo: "#254D32",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: () => "#fff",
            }}
            style={styles.chart}
            bezier
          />

          <Text style={styles.sectionTitle}>
            Distribuição dos Materiais Separados
          </Text>
          <PieChart
            data={[
              {
                name: "Plástico",
                population: 60,
                color: "#69B578",
                legendFontColor: "#333",
                legendFontSize: 14,
              },
              {
                name: "Metal",
                population: 40,
                color: "#FFB627",
                legendFontColor: "#333",
                legendFontSize: 14,
              },
            ]}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              color: () => "#fff",
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        </ScrollView>

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontFamily: "Roboto-Bold",
    color: "#69B578",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  cardTitle: {
    fontFamily: "Roboto-Bold",
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  cardValue: {
    fontFamily: "Roboto-Bold",
    color: "#fff",
    fontSize: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#254D32",
    marginVertical: 10,
  },
  chart: {
    borderRadius: 15,
    marginBottom: 20,
  },
  statusBarBackground: {
    width: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
