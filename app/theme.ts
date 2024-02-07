import { extendTheme } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorMode, StorageManager } from "native-base";

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (value: ColorMode | string) => {
    try {
      console.log(value);
      await AsyncStorage.setItem("@color-mode", value!);
    } catch (e) {
      console.log(e);
    }
  },
};

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

export const theme = extendTheme({
  config,
  fontConfig: {
    Montserrat: {
      100: {
        normal: "mon",
      },
      200: {
        normal: "mon",
      },
      300: {
        normal: "mon",
      },
      400: {
        normal: "mon",
      },
      500: {
        normal: "mon",
      },
      600: {
        normal: "mon-sb",
      },
      700: {
        normal: "mon-sb",
      },
      800: {
        normal: "mon-b",
      },
      900: {
        normal: "mon-b",
      },
    },
  },

  components: {
    Text: {
      baseStyle: (props: any) => {
        return {
          _light: { color: "dark.100" },
          _dark: { color: "light.100" },
        };
      },
    },
    Heading: {
      defaultProps: {
        borderRadius: 12,
      },
      baseStyle: (props: any) => {
        return {
          _light: { color: "dark.100", bg: "blueGray.100" },
          _dark: { color: "light.100", bg: "blueGray.800" },
        };
      },
    },
    Badge: {
      defaultProps: {
        borderRadius: 12,
      },
      baseStyle: (props: any) => {
        return {
          _light: { bg: "dark.500" },
          _dark: { bg: "blueGray.800" },
        };
      },
    },
    Box: {
      defaultProps: {
        borderRadius: 12,
      },
    },
    Container: {
      defaultProps: {
        borderRadius: 12,
      },
      baseStyle: (props: any) => {
        return {
          _light: { bg: "blueGray.200" },
          _dark: { bg: "blueGray.500" },
        };
      },
    },
    Stack: {
      defaultProps: {
        borderRadius: 12,
      },
      baseStyle: (props: any) => {
        return {
          _light: { bg: "blueGray.200" },
          _dark: { bg: "blueGray.800" },
        };
      },
    },
    VStack: {
      baseStyle: (props: any) => {
        return {
          _light: { bg: "transparent" },
          _dark: { bg: "transparent" },
        };
      },
    },
    ScrollView: {
      baseStyle: (props: any) => {
        return {
          _light: { bg: "light.100" },
          _dark: { bg: "coolGray.900" },
        };
      },
    },
    HStack: {
      baseStyle: (props: any) => {
        return {
          _light: { bg: "transparent" },
          _dark: { bg: "transparent" },
        };
      },
    },
    Input: {
      defaultProps: {
        _focus: {
          bg: "transparent",
          color: 'black',
          borderColor: "indigo.300",
        },
      },
      baseStyle: (props: any) => {
        return {
          _light: {
            bg: "muted.50",
            color: "dark.100",
            borderColor: "muted.200",
            placeholderTextColor: "dark.100",
          },
          _dark: {
            bg: "blueGray.600",
            color: "light.100",
            borderColor: "muted.700",
            placeholderTextColor: "light.100",
          },
        };
      },
    },
    // Button: {
    //   defaultProps: {
    //     bg: {
    //       linearGradient: {
    //         colors: ["indigo.200", "indigo.800"],
    //         start: [0, 0],
    //         end: [1, 1],
    //       },
    //     },
    //   },
    // },
    Select: {
      defaultProps: {
        _focus: {
          bg: "muted.100",
          borderColor: "indigo.300",
        },
      },
      baseStyle: (props: any) => {
        return {
          _light: {
            bg: "muted.50",
            color: "dark.100",
            borderColor: "muted.200",
            placeholderTextColor: "dark.100",
          },
          _dark: {
            bg: "blueGray.600",
            color: "light.100",
            borderColor: "muted.700",
            placeholderTextColor: "light.100",
          },
        };
      },
    },
  },

  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
    mono: "Montserrat",
  },
});
