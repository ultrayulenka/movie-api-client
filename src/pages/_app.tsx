import type { AppContext, AppInitialProps, AppProps } from "next/app";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import App from "next/app";
import { Cookies, CookiesProvider } from "react-cookie";

type AppOwnProps = { cookies: string };

export default function MyApp({
  Component,
  pageProps,
  cookies,
}: AppProps & AppOwnProps) {
  const isBrowser = typeof window !== "undefined";
  return (
    <CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx, cookies: context.ctx.req?.headers.cookie };
};
