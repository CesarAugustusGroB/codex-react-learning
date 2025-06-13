import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e9f5f2",
      100: "#c8e7de",
      200: "#a4d8c9",
      300: "#7fC9b5",
      400: "#5bbbA1",
      500: "#41a187",
      600: "#318067",
      700: "#225f49",
      800: "#113e2c",
      900: "#001e10",
    },
  },
  fonts: {
    heading: "'Segoe UI', sans-serif",
    body: "'Roboto', sans-serif",
  },
});

export default theme;
