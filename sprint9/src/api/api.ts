import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  useToken?: boolean;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER
});

//TODO: customConfig.headers 빨간줄 없애기
instance.interceptors.request.use(
  (config) => {
    const customConfig = config as CustomAxiosRequestConfig;
    if (customConfig.useToken) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        customConfig.headers = {
          ...customConfig.headers,
          Authorization: `Bearer ${token}`
        };
      }
    }
    return customConfig;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await instance.post("/auth/refresh-token", {
            refreshToken
          });
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
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

export function putRequest(
  url: string,
  body: object,
  useToken: boolean = false
) {
  return instance.put(url, body, { useToken } as CustomAxiosRequestConfig);
}

export function deleteRequest(url: string, useToken: boolean = false) {
  return instance.delete(url, { useToken } as CustomAxiosRequestConfig);
}
