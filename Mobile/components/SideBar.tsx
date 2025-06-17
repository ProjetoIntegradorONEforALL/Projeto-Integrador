import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.6;

interface SidebarProps {
  onNavigate: (screen: string) => void;
  onToggle: () => void;
}

export default function Sidebar({ onNavigate, onToggle }: SidebarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.sidebar,
        {
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
          width: SIDEBAR_WIDTH,
        },
      ]}
    >
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={onToggle}>
          <Ionicons name="menu" size={28} />
        </TouchableOpacity>
        <Image style={styles.logo} source={require("../assets/logo.png")} />

        <Text style={styles.ecoText}>
          eco
          <Text style={styles.visionText}>Vision</Text>
        </Text>
      </View>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => onNavigate(item.screen)}
        >
          {item.icon}
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => onNavigate("settings")}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text style={styles.text}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => onNavigate("Ajuda")}
        >
          <Ionicons name="help-circle-outline" size={24} color="black" />
          <Text style={styles.text}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const menuItems = [
  {
    screen: "dashboard",
    label: "Início",
    icon: <FontAwesome5 name="house-user" size={24} color="black" />,
  },
  {
    screen: "monitoring",
    label: "Monitoramento",
    icon: <Ionicons name="desktop-outline" size={24} color="black" />,
  },
  {
    screen: "chatbot",
    label: "Chatbot",
    icon: (
      <MaterialCommunityIcons name="robot-outline" size={24} color="black" />
    ),
  },
  {
    screen: "alerts",
    label: "Relatórios",
    icon: <Ionicons name="document-text-outline" size={24} color="black" />,
  },
  {
    screen: "Controle",
    label: "Controle de máquinas",
    icon: <FontAwesome5 name="cogs" size={24} color="black" />,
  },
];

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    zIndex: 1000,
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  ecoText: {
    fontSize: 24,
    color: "#000",
    marginLeft: 8,
  },
  visionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    marginLeft: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
    color: "#000",
  },
  footer: {
    marginTop: 330,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerItem: {
    marginBottom: 20,
    flexDirection: "row",
  },
});
