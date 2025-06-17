import React, { useState, useRef } from "react";
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
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useNavigation, useRouter } from "expo-router";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const { width } = Dimensions.get("window");

export default function Monitoramento() {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const animation = useRef(new Animated.Value(-width * 0.7)).current;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

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
        <Header title="Monitoramento" onMenuPress={toggleSidebar} />

        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          <Text style={styles.header}>Monitoramento</Text>

          <Text style={styles.sectionTitle}>Separação por Tamanho (Kg)</Text>
          <LineChart
            data={{
              labels: ["Baixo", "Médio", "Alto"],
              datasets: [
                {
                  data: [32, 50, 40], // plástico
                  color: (opacity = 1) => `rgba(105, 181, 120, ${opacity})`,
                  strokeWidth: 2,
                  label: "Plástico",
                },
                {
                  data: [20, 35, 25], // metal
                  color: (opacity = 1) => `rgba(255, 182, 39, ${opacity})`,
                  strokeWidth: 2,
                  label: "Metal",
                },
              ],
              legend: ["Plástico", "Metal"],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#69B578",
              backgroundGradientTo: "#254D32",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: () => "#fff",
              style: {
                borderRadius: 15,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
            }}
            bezier
            style={styles.chart}
          />

          <Text style={styles.sectionTitle}>Quantidade Separada Hoje (Kg)</Text>
          <BarChart
            data={{
              labels: ["Plástico Baixo", "Plástico Médio", "Plástico Alto", "Metal Baixo", "Metal Médio", "Metal Alto"],
              datasets: [
                {
                  data: [10, 20, 30, 5, 10, 25],
                },
              ],
            }}
            width={screenWidth - 32}
            height={250}
            yAxisLabel=""
            yAxisSuffix=" kg"
            chartConfig={{
              backgroundGradientFrom: "#A1C181",
              backgroundGradientTo: "#69B578",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: () => "#333",
              style: {
                borderRadius: 15,
              },
            }}
            style={styles.chart}
            verticalLabelRotation={60}
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
