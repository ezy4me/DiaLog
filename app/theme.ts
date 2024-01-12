import { extendTheme } from "native-base";

export const theme = extendTheme({
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
    Input: {
      baseStyle: {
        type: "text",
      },
      defaultProps: {
        borderColor: 'muted.200',
        bg: "light.50",
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
          bg: "muted.100",
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
