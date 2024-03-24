import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { NativeBaseProvider } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

import { colorModeManager, theme } from "./theme";

import useAppSettingsStore from "./store/appSettingsStore";
import useAuthStore from "./store/authStore";

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
  initialRouteName: "(modals)/startup",
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

  const startUp = useAppSettingsStore((state) => state.startUp);

  const { user, accessToken, getUser, getAccessToken } = useAuthStore(
    (state) => ({
      user: state.user,
      accessToken: state.accessToken,
      getUser: state.getUser,
      getAccessToken: state.getAccessToken,
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) await getUser();
      if (!accessToken) {
        await getAccessToken();
      }
    };
    fetchData();
  }, [user, accessToken]);

  useEffect(() => {
    const handleStartUp = async () => {
      const openStartUp = await startUp;
      if (openStartUp) {
        router.push("/(modals)/startup");
      }
    };

    handleStartUp();
  }, [startUp, router]);

  return (
    <NativeBaseProvider
      theme={theme}
      config={config}
      colorModeManager={colorModeManager}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/startup"
          options={{
            headerShown: false,
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
          name="(modals)/login"
          options={{
            title: "Войти",
            presentation: "modal",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#818cf8",
            },
          }}
        />
        <Stack.Screen
          name="(modals)/registration"
          options={{
            title: "Регистрация",
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
         <Stack.Screen
          name="(modals)/doctor/patientInfo"
          options={{
            headerTitle: "Данные пациента",
            title: "Данные пациента",
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
