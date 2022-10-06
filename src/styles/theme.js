/**
 * Tema customizado.
 */

import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import {
  Button,
  Drawer,
  FormLabel,
  Input,
  Select,
  Modal,
  Textarea,
} from "./ComponentsTheme";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#966df4",
      100: "#743ef1",
      200: "#6326ef",
      300: "#5311ea",
      400: "#4b0fd3",
      500: "#3A0CA3",
      600: "#290973",
      700: "#21075c",
      800: "#180544",
      900: "#070214",
    },
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
    xBold: 900,
  },
  styles: {
    global: (props) => ({
      "*": {
        "&::-webkit-scrollbar": {
          width: "0px",
          backgroundColor: "rgb(255,255,255,0.0)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#A0AEC0",
          borderRadius: "10px",
          border: "px solid #F7FAFC",
        },
      },
      body: {
        bg: mode("gray.50", "gray.900")(props),
        fontFamily: "Red Hat Display, sans-serif",
        transitionDuration: ".5s",
        overscrollBehaviorY: "none",
      },
      html: {
        fontFamily: "Red Hat Display, sans-serif",
      },
    }),
  },
  components: {
    Button,
    Drawer,
    FormLabel,
    Input,
    Select,
    Modal,
    Textarea,
  },
});

export default theme;
