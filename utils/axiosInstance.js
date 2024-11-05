import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

export const fetchApi = async (
  url,
  params = {},
  method = "GET",
  requiresAuth = false
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (requiresAuth && !accessToken) {
      throw new Error("로그인이 필요합니다.");
    }

    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const config = {
      url,
      method,
      headers,
      params: method === "GET" || method === "DELETE" ? params : {},
      data: method !== "GET" && method !== "DELETE" ? params : undefined,
    };

    const response = await axiosInstance.request(config);

    return response.data;
  } catch (error) {
    console.error("API 에러", error.response?.data || error.message);
    throw error;
  }
};
