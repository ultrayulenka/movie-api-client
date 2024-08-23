import axios, {
  AxiosInstance,
  Canceler,
  InternalAxiosRequestConfig,
} from "axios";
import { removeFalsyValues } from "./object";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const CANCEL_DELAY = 1000;

const API_URL = "https://movies-api-9eyb.onrender.com";

type RequestInterceptor = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig;

const getAuthToken = (cookies: ReadonlyRequestCookies): string | null => {
  const token = cookies.get("token");

  if (token) {
    return `Bearer ${token}`;
  }

  return null;
};

const withDefaultHeaders = (
  config: InternalAxiosRequestConfig,
  defaultHeaders: Record<string, string | Array<string> | undefined | null>
): InternalAxiosRequestConfig => {
  const headers = {
    ...removeFalsyValues(defaultHeaders),
    ...(config.headers || {}),
  };

  return { ...config, headers } as InternalAxiosRequestConfig;
};

export const addAuthHeaders =
  (cookies: ReadonlyRequestCookies): RequestInterceptor =>
  (config): InternalAxiosRequestConfig => {
    const token = getAuthToken(cookies);

    if (token) {
      return withDefaultHeaders(config, {
        authorization: token,
      });
    }

    return config;
  };

export const getClientApiInstance = (cookies: ReadonlyRequestCookies): AxiosInstance => {
  const sourceRequest: { [key: string]: { cancel: Canceler } } = {};

  let baseURL = API_URL;
  let cancelCounter = 0;

  const client = axios.create({ baseURL, timeout: 30000 });

  client.interceptors.request.use(addAuthHeaders(cookies));

  client.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      const { url = "" } = request;

      if (sourceRequest[url] && cancelCounter >= 1) {
        sourceRequest[url].cancel("Automatic cancellation");
      }

      const axiosSource = axios.CancelToken.source();

      sourceRequest[url] = { cancel: axiosSource.cancel };
      // eslint-disable-next-line no-param-reassign
      request.cancelToken = axiosSource.token;

      setTimeout(() => cancelCounter++, CANCEL_DELAY);

      return request;
    },
    (error) => Promise.reject(error)
  );

  return client;
};
