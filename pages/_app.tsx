import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans";
import { AuthProvider } from "../hooks/useAuth";
const colors = {
  text: "#EEEEEE",
  box: "#393E46",
  background: "#222831",
  secondary: "#00ADB5",
};
const fonts = {
  heading: "IBM Plex Sans",
  body: "IBM Plex Sans",
};
const textStyles = {
  title: {
    // you can also use responsive styles
    fontSize: ["20px"],
    fontWeight: "bold",
  },
  normal: {
    fontSize: ["16px"],
    fontWeight: "normal",
  },
};
const theme = extendTheme({ colors, fonts, textStyles });
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Box background={"background"}>
          <Component {...pageProps} />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
