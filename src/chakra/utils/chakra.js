// chakra/utils/chakra.js

import {
  ChakraProvider,
  // chakra provided storage managers:
  cookieStorageManager,
  CSSReset,
  localStorageManager,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import Head from "next/head";
import theme from "styles/theme";

export function Chakra({ cookies, children }) {
  // b) Pass `colorModeManager` prop
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider 
    theme={theme}
    colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

export function GlobalStyle({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            height: var(--vh);
          }
        `}
      />
      {children}
    </>
  );
}

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? "",
    },
  };
}
