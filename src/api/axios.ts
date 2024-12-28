import axiosLib, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import { clearTokens, getTokens, setTokens } from "../utils/authToken";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function omitEmptyParams(params: any) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" || typeof value === "undefined"
    )
  );
}

const axios = axiosLib.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    NProgress.start();

    config.params = omitEmptyParams(config.params ?? {});

    const { accessToken } = getTokens();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  function (error): Promise<never> {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    NProgress.done();
    if (response.data?.accessToken && response.data?.refreshToken) {
      const { accessToken, refreshToken } = response.data;
      setTokens({ accessToken, refreshToken });
    }
    return response;
  },
  function (error) {
    NProgress.done();
    if (error.response?.status === 401) {
      clearTokens();
    }

    const responseData = error.response?.data;
    if (!!responseData?.message) {
      return Promise.reject(new Error(responseData.message));
    }

    return Promise.reject(new Error("알 수 없는 오류입니다"));
  }
);

export default axios;