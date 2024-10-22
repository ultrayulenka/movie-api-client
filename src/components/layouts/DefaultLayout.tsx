"use client";
import { FunctionComponent, ReactNode, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import { Header } from "../Header";
import { User } from "../../types";
import { useDispatch } from "react-redux";
import { authentificate } from "../../redux/features/auth-slice";

interface Props {
  children: ReactNode;
  user?: User;
}

export const DefaultLayout: FunctionComponent<Props> = ({ children, user }) => {
  const dispacth = useDispatch();
  dispacth(authentificate(user));
  
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
