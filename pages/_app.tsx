import "../styles/globals.css";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans";
import type { AppProps } from "next/app";
//
import { createBrowserSupabaseClient, Session } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

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
function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const AnyComponent = Component as any;
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <ChakraProvider theme={theme}>
      <Box background={"background"}>
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
          <AnyComponent {...pageProps} />
        </SessionContextProvider>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
