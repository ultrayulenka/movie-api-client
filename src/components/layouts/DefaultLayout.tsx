"use client"
import { FunctionComponent, ReactNode, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import { Header } from "../Header";

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FunctionComponent<Props> = ({ children }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);
  
  return (
    <div>
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
};
