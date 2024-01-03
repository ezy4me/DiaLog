import { Input, extendTheme } from "native-base";

export const theme = extendTheme({
  fontConfig: {
    Montserrat: {
      100: {
        normal: "Montserrat_100Thin",
      },
      200: {
        normal: "Montserrat_200ExtraLight",
      },
      300: {
        normal: "Montserrat_300Light",
      },
      400: {
        normal: "Montserrat_400Regular",
      },
      500: {
        normal: "Montserrat_500Medium",
      },
      600: {
        normal: "Montserrat_600SemiBold",
      },
      700: {
        normal: "Montserrat_700Bold",
      },
      800: {
        normal: "Montserrat_800ExtraBold",
      },
      900: {
        normal: "Montserrat_900Black",
      },
    },
  },

  components: {
    Input: {
      baseStyle: {
        type: "text",
      },
      defaultProps: {
        colorScheme: "red",
        bg: "muted.100",
        _hover: {
          bg: "amber.100",
        },
        _focus: {
          bg: "muted.100",
          borderColor: "indigo.300",
        },
      },
      Select: {
        defaultProps: {
          colorScheme: "red",
          bg: "muted.100",
          _hover: {
            bg: "amber.100",
          },
          _focus: {
            bg: "muted.100",
            borderColor: "indigo.300",
          },
        },
      },
    },
  },

  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
    mono: "Montserrat",
  },
});
