import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { sendMessageToChatbot } from "./services/chatbotService";

const { width } = Dimensions.get("window");

export const options = {
  headerShown: false,
};

export default function ChatBot() {
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const animation = useRef(new Animated.Value(-width * 0.7)).current;
  const [isSidebarVisible, setSidebarVisible] = useState(false);

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

  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! Como posso te ajudar hoje?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const botReply = await sendMessageToChatbot(input);
      const botResponse = {
        id: Date.now() + 1,
        text: botReply,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Erro ao conectar com o assistente. Verifique sua conexão.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={styles.safeArea}>
        <Header title="Assistente Virtual" onMenuPress={toggleSidebar} />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={styles.chatBox}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.sender === "user" ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.sender === "user" ? styles.userText : styles.botText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem..."
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Ionicons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* Sidebar animada com altura 100% */}
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
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  chatBox: {
    flex: 1,
  },
  messageBubble: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#69B578",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  botBubble: {
    backgroundColor: "#E0E0E0",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 15,
  },
  userText: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
  },
  botText: {
    color: "#333",
    fontFamily: "Roboto-Regular",
  },
  inputContainer: {
    position: "absolute",
    bottom: 60,
    left: 16,
    right: 16,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Roboto-Regular",
  },
  sendButton: {
    backgroundColor: "#69B578",
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
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
