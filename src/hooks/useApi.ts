import type { AxiosInstance } from "axios";
import { useContext } from "react";
import { appContext } from "../context/app";
import { Cookies, useCookies } from "react-cookie";
import { getClientApiInstance } from "../utils/api";

export const useApi = (cookies: Cookies): AxiosInstance => {
  return getClientApiInstance(cookies);
};
