import type { AxiosInstance } from "axios";
import { Cookies } from "react-cookie";
import { getClientApiInstance } from "../utils/api";

export const useApi = (cookies: Cookies): AxiosInstance => {
  return getClientApiInstance(cookies);
};
