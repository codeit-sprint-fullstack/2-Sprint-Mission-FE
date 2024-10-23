import axios from "axios";

// axios instance 생성하기
const axiosInstance = axios.create({
  baseURL: "https://panda-market-api.vercel.app", // 기본 URL
  timeout: 5000,
});

// API 요청 함수
export const fetchApi = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("API 에러: ", error);
    throw error;
  }
};
