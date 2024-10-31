import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://panda-market-api.vercel.app", // 기본 URL
  timeout: 5000,
});

export const fetchApi = async (url, params = {}, method = "GET") => {
  try {
    const headers =
      method === "GET" || method === "DELETE"
        ? {}
        : {
            "Content-Type": "application/json",
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
    console.error("API 요청 에러:", error);
    throw error;
  }
};
