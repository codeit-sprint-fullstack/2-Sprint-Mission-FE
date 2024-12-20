import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const response = await instance.post("/auth/refresh-token", {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 토큰 오류:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그인 페이지로 리디렉션
      }
    } else {
      console.error(error);
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
