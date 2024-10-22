"use client";

import { createContext, ReactNode, useContext } from "react";
import { User } from "../types";

const ClientContext = createContext({ user: null });

export function useClientContext() {
  return useContext(ClientContext);
}
type Props = {
  children: ReactNode;
  user?: User;
};

export default function ClientProvider<Props>({ children, user }) {
  return (
    <ClientContext.Provider value={{ user }}>{children}</ClientContext.Provider>
  );
}
