"use-client";
import { cookies } from "next/headers";
import React from "react";
import { User } from "../types";
import { getClientApiInstance } from "../utils/api";
import { store } from "../redux/store";
import { authentificate } from "../redux/features/auth-slice";
import StoreProvider from "./store-provider";

async function getData(): Promise<{ userData: User | null }> {
  const cookiesValue = cookies();
  const api = getClientApiInstance(cookiesValue);
  let userData: User | null = null;

  try {
    const apiData = await api.get<User>("/auth/");
    userData = apiData.data;
  } catch (error) {
    console.log("error");
  }

  return { userData };
}

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await getData();

  store.dispatch(authentificate(authData.userData));

  return <StoreProvider>{children}</StoreProvider>;
}
