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
  startUp: Promise<boolean>;
};

type AppSettingsAction = {
  switchTheme: (theme: AppSettingsState["theme"]) => void;
  switchWeight: (weight: AppSettingsState["weight"]) => void;
  switchHeight: (height: AppSettingsState["height"]) => void;
  switchGlucose: (glucose: AppSettingsState["glucose"]) => void;
  switchLang: (lang: AppSettingsState["lang"]) => void;
  setStartUp: (startUp: AppSettingsState["startUp"]) => Promise<any>;
};

const getAsyncStorageValue = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  if (value) console.log("get async storage value app: ", value);
  return value === "true" ? true : value === "false" ? false : true;
};

const useAppSettingsStore = create<AppSettingsState & AppSettingsAction>(
  (set) => ({
    theme: "light",
    weight: "kg",
    height: "cm",
    glucose: "mmol/l",
    lang: "ru",
    startUp: getAsyncStorageValue("startUp") || true,
    switchTheme: (theme: any) =>
      set((state) => {
        colorModeManager.set(theme);
        state.theme = theme;
        return { theme };
      }),
    switchWeight: (weight) => set(() => ({ weight })),
    switchHeight: (height) => set(() => ({ height })),
    switchGlucose: (glucose) => set(() => ({ glucose })),
    switchLang: (lang) => set(() => ({ lang })),
    setStartUp: async (value) => {
      const resolvedValue = await value;
      await AsyncStorage.setItem("startUp", resolvedValue.toString());
      set({
        startUp: value,
      });
    },
  })
);

export default useAppSettingsStore;
