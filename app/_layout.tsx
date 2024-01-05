import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { NativeBaseProvider } from "native-base";

// import {
//   useFonts,
//   Montserrat_100Thin,
//   Montserrat_200ExtraLight,
//   Montserrat_300Light,
//   Montserrat_400Regular,
//   Montserrat_500Medium,
//   Montserrat_600SemiBold,
//   Montserrat_700Bold,
//   Montserrat_800ExtraBold,
//   Montserrat_900Black,
// } from "@expo-google-fonts/montserrat";

// import { theme } from "./theme";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
export { ErrorBoundary } from "expo-router";

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

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

console.log("111");

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    // Montserrat_100Thin,
    // Montserrat_200ExtraLight,
    // Montserrat_300Light,
    // Montserrat_400Regular,
    // Montserrat_500Medium,
    // Montserrat_600SemiBold,
    // Montserrat_700Bold,
    // Montserrat_800ExtraBold,
    // Montserrat_900Black,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      console.log(fontsLoaded);

      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log(fontsLoaded);

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
    <NativeBaseProvider config={config}>
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
      </Stack>
    </NativeBaseProvider>
  );
}
