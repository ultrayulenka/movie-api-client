"use client"
import { FunctionComponent, ReactNode, useState } from "react";
import { User } from "../../types";
import { appContext } from "../../context/app";

interface Props {
  children: ReactNode;
  userData: User | null;
}

export const ContextProvider: FunctionComponent<Props> = ({ children, userData}) => {
    const [user, setUser] = useState(userData);

    return (
      <appContext.Provider value={{ user, setUser }}>
        {children}
      </appContext.Provider>
    );
};
