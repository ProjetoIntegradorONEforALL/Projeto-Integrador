import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import i18n from "../i18n";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

const screenWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");

export default function Settings() {
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
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const { t } = useTranslation();

  const settings = [
    {
      id: 1,
      title: t("edit_profile"),
      icon: "person",
      onPress: () =>
        Alert.alert(t("edit_profile"), "Funcionalidade em breve."),
    },
    {
      id: 2,
      title: t("notifications"),
      icon: "notifications-active",
      onPress: () =>
        Alert.alert(t("notifications"), "Configurações em breve."),
    },
    {
      id: 3,
      title: t("language"),
      icon: "language",
      onPress: () => {
        Alert.alert(
          t("language"),
          undefined,
          [
            { text: "Português", onPress: () => i18n.changeLanguage("pt") },
            { text: "Inglês", onPress: () => i18n.changeLanguage("en") },
            { text: "Espanhol", onPress: () => i18n.changeLanguage("es") },
            { text: "Cancelar", style: "cancel" },
          ],
          { cancelable: true }
        );
      },
    },
    {
      id: 4,
      title: t("about"),
      icon: "info",
      onPress: () => Alert.alert(t("about"), t("version")),
    },
    {
      id: 5,
      title: t("logout"),
      icon: "logout",
      onPress: () =>
        Alert.alert(t("logout"), t("logout_success"), [
          {
            text: "OK",
            onPress: () => {
              // Redirecionar para a tela de login (substitua por navegação real no seu app)
              console.log("Voltar para a tela de login");
            },
          },
        ]),
    },
  ];

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
        <Header title="Configurações" onMenuPress={toggleSidebar} />

        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          <Text style={styles.header}>{t("settings")}</Text>
          <ScrollView style={styles.optionsContainer}>
            {settings.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.optionItem}
                onPress={item.onPress}
              >
                <MaterialIcons name={item.icon as any} size={24} color="#254D32" />
                <Text style={styles.optionText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontFamily: "Roboto-Bold",
    color: "#69B578",
    marginBottom: 20,
  },
  optionsContainer: {
    paddingBottom: 100,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#333",
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
  }
});
