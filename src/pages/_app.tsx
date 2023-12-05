import type { AppContext, AppInitialProps, AppProps } from "next/app";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";
import App from "next/app";
import { Cookies, CookiesProvider } from "react-cookie";
import { getClientApiInstance } from "../utils/api";
import { User } from "../types";
import { appContext } from "../context/app";

type AppOwnProps = {
  cookies: string;
  userData: User | null;
};

export default function MyApp({
  Component,
  pageProps,
  cookies,
  userData,
}: AppProps & AppOwnProps) {
  const [user, setUser] = useState(userData);
  const isBrowser = typeof window !== "undefined";

  return (
    <CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}>
      <appContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </appContext.Provider>
    </CookiesProvider>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);
  const cookies = new Cookies(context.ctx.req?.headers.cookie);
  const api = getClientApiInstance(cookies);
  let userData = null;

  try {
    userData = (await api.get<User>("/auth/")).data;
  } catch (error) {
    console.log("error");
  }

  return { ...ctx, cookies: context.ctx.req?.headers.cookie, userData };
};
