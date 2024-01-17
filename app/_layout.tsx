import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { NativeBaseProvider } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

import { colorModeManager, theme } from "./theme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorMode, useColorMode, StorageManager } from "native-base";
import useAppSettingsStore from "./store/appSettingsStore";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
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

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { colorMode } = useColorMode();

  colorModeManager.get();

  return (
    <NativeBaseProvider
      theme={theme}
      config={config}
      colorModeManager={colorModeManager}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/login"
          options={{
            title: "Войти",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
        <Stack.Screen
          name="(modals)/addBloodSugar"
          options={{
            headerTitle: "Добавить значение",
            title: "Добавить значение",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
        <Stack.Screen
          name="(modals)/bookInfo"
          options={{
            headerTitle: "Справочник",
            title: "Справочник",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
        <Stack.Screen
          name="(modals)/aboutApp"
          options={{
            headerTitle: "О приложении",
            title: "О приложении",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
        <Stack.Screen
          name="(modals)/profile/appDataSettings"
          options={{
            headerTitle: "Настройки приложения",
            title: "Настройки приложения",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
        <Stack.Screen
          name="(modals)/profile/archiveDataSettings"
          options={{
            headerTitle: "Дополнительно",
            title: "Дополнительно",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
        <Stack.Screen
          name="(modals)/profile/notificationDataSettings"
          options={{
            headerTitle: "Настройка уведовлений",
            title: "Настройка уведовлений",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
        <Stack.Screen
          name="(modals)/profile/personalDataSettings"
          options={{
            headerTitle: "Личные данные",
            title: "Личные данные",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
