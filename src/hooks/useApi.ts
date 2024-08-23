import type { AxiosInstance } from "axios";
import { getClientApiInstance } from "../utils/api";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const useApi = (cookies: ReadonlyRequestCookies): AxiosInstance => {
  return getClientApiInstance(cookies);
};
