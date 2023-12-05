import { createContext } from "react";
import { User } from "../types";

interface AppContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

const DEFAULT_APP_CONTEXT: AppContextValue = {
  user: null,
  setUser: () => {}
};

const appContext = createContext(DEFAULT_APP_CONTEXT);

export { appContext, DEFAULT_APP_CONTEXT };
export type { AppContextValue };
