"use client";
import React from "react";
import { User } from "../types";
import { store } from "../redux/store";
import { authentificate } from "../redux/features/auth-slice";
import StoreProvider from "./store-provider";

export default function ClientLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: User;
}) {
  store.dispatch(authentificate(user));

  return <StoreProvider>{children}</StoreProvider>;
}
