import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { NativeBaseProvider } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "./theme";

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

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/(modals)/login");
  //   }
  // }, [isLoaded]);

  return (
    <NativeBaseProvider theme={theme} config={config}>
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
            },
          }}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
