import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  useToken?: boolean;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER
});

instance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    if (config.useToken) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        } as InternalAxiosRequestConfig["headers"];
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await instance.post("/auth/refresh-token", { refreshToken });
        originalRequest._retry = true;
        return instance(originalRequest);
      } else {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(err);
  }
);

export function getRequest(
  url: string,
  params: object = {},
  useToken: boolean = false
) {
  return instance.get(url, { params, useToken } as CustomAxiosRequestConfig);
}

export function postRequest(
  url: string,
  body: object = {},
  useToken: boolean = false
) {
  return instance.post(url, body, { useToken } as CustomAxiosRequestConfig);
}

export function patchRequest(
  url: string,
  body: object,
  useToken: boolean = false
) {
  return instance.patch(url, body, { useToken } as CustomAxiosRequestConfig);
}

export function deleteRequest(url: string, useToken: boolean = false) {
  return instance.delete(url, { useToken } as CustomAxiosRequestConfig);
}
