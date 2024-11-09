import axios from "axios";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 리프레시 토큰 요청
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axios.post("/auth/refresh-token", {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken); // 새로운 accessToken 저장

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 토큰 오류:", refreshError);
        // 리프레시 토큰이 만료되었거나 오류가 발생하면 로그인 페이지로 리디렉션
        window.location.href = "/login"; // 로그인 페이지로 리디렉션
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
