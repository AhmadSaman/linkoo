import "../styles/globals.css";
import theme from "../styles/chakra";
import { Box, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient, Session } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const NewComponent = Component as any;
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <ChakraProvider theme={theme}>
      <Box background={"background"}>
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
          <NewComponent {...pageProps} />
        </SessionContextProvider>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
