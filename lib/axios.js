import axios from "axios";

export const fetchApi = async (url, params = {}, method = "GET") => {
  try {
    // 기본 URL 설정
    const baseURL = "http://localhost:4000";

    // URL에 쿼리 파라미터 추가
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString
      ? `${baseURL}${url}?${queryString}`
      : `${baseURL}${url}`;

    // Axios 요청
    const response = await axios({
      method, // GET이 기본값
      url: fullUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: method === "POST" || method === "PATCH" ? params : undefined,
    });

    return response.data; // 응답 데이터 반환
  } catch (e) {
    console.error(e);
    throw e; // 에러 던지기
  }
};
