import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "login", // Definindo a tela inicial como a de login
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            title: "Login", // Define o título da tela
            headerShown: false, // Remove o cabeçalho (setinha de voltar)
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            title: "Dashboard", // Define o título da tela
            headerShown: false, // Remove o cabeçalho (setinha de voltar)
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Register", // Define o título da tela
            headerShown: false, // Remove o cabeçalho (setinha de voltar)
          }}
        />
        <Stack.Screen
          name="splashScreen"
          options={{
            title: "SplashScreen", // Define o título da tela
            headerShown: false, // Remove o cabeçalho (setinha de voltar)
          }}
        />
        <Stack.Screen
          name="monitoring"
          options={{
            title: "Monitoramento", // Define o título da tela
            headerShown: false, // Remove o cabeçalho (setinha de voltar)
          }}
        />
        <Stack.Screen
          name="chatbot"
          options={{
            title: "Chatbot", // Define o título da tela
            headerShown: false, // Remove o cabeçalho (setinha de voltar)
          }}
        />
        <Stack.Screen
          name="alerts"
          options={{
            title: "Relatório", // Define o título da tela
            headerShown: false, // Remove o cabeçalho (setinha de voltar)
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Configurações", // Define o título da tela
            headerShown: false, // Remove o cabeçalho (setinha de voltar)
          }}
        />
        <Tabs
          screenOptions={{
            headerShown: false, // Remove o cabeçalho de todas as telas dentro de Tabs
          }}
        >
          <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
          <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
