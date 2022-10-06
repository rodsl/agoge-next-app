import { Chakra, GlobalStyle } from "chakra/utils/chakra";
import { AuthCheck } from "components/AuthCheck";
import { DashboardLayout } from "components";
import { SessionProvider } from "next-auth/react";

import "styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  useEffect(() => {
    if (typeof window !== undefined) {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
console.log("_app.js")
    window.addEventListener("resize", () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <Chakra cookies={pageProps.cookies}>
      <GlobalStyle />
      <SessionProvider session={session}>
        {Component.auth && (
          <AuthCheck>
            {Component.dashboard ? (
              <DashboardLayout {...pageProps}>
                <Component {...pageProps} />
              </DashboardLayout>
            ) : (
              // <Component {...pageProps} />
              <Component {...pageProps} />
            )}
          </AuthCheck>
        )}
        {/* {!Component.auth && Component.dashboard && (
          <DashboardLayout appName={appName} {...pageProps} {...pageProps}>
            <Component {...pageProps} />
          </DashboardLayout>
        )} */}
        {!Component.auth && !Component.dashboard && (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </Chakra>
  );
}

export default MyApp;
