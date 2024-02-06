import { ColorMode, useColorMode } from "native-base";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorModeManager } from "../theme";
import { useEffect } from "react";

type AppSettingsState = {
  theme: string | any;
  weight: string;
  height: string;
  glucose: string;
  lang: string;
  startUp: boolean | any;
};

type AppSettingsAction = {
  switchTheme: (theme: AppSettingsState["theme"]) => void;
  switchWeight: (weight: AppSettingsState["weight"]) => void;
  switchHeight: (height: AppSettingsState["height"]) => void;
  switchGlucose: (glucose: AppSettingsState["glucose"]) => void;
  switchLang: (lang: AppSettingsState["lang"]) => void;
  setStartUp: (startUp: AppSettingsState["startUp"]) => void;
};

const useAppSettingsStore = create<AppSettingsState & AppSettingsAction>(
  (set) => ({
    theme: "light",
    weight: "kg",
    height: "cm",
    glucose: "mmol/l",
    lang: "ru",
    startUp: async () => {
      const storedStartUp = await AsyncStorage.getItem("startUp");
      return storedStartUp === "true";
    },
    switchTheme: (theme: any) =>
      set((state) => {
        console.log("state theme in:", theme);
        console.log("state theme:", state.theme);
        colorModeManager.set(theme);
        state.theme = theme;
        return { theme };
      }),
    switchWeight: (weight) => set(() => ({ weight })),
    switchHeight: (height) => set(() => ({ height })),
    switchGlucose: (glucose) => set(() => ({ glucose })),
    switchLang: (lang) => set(() => ({ lang })),
    setStartUp: (startUp) => {
      AsyncStorage.setItem("startUp", startUp);
      set(() => ({}));
    },
  })
);

export default useAppSettingsStore;
