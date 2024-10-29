// API 요청 함수
export const fetchApi = async (url, params = {}, method = "GET") => {
  try {
    // 기본 URL 설정
    const baseURL = "http://localhost:4000";

    // URL에 쿼리 파라미터 추가
    const queryString = new URLSearchParams(params).toString();

    const fullUrl =
      method === "GET" ? `${baseURL}${url}?${queryString}` : `${baseURL}${url}`;

    const headers =
      method === "GET"
        ? {}
        : {
            "Content-Type": "application/json",
          };

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: method !== "GET" ? JSON.stringify(params) : undefined,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
