// API 요청 함수
export const fetchApi = async (url, params = {}, method = "GET") => {
  try {
    // 기본 URL 설정
    const baseURL = "http://localhost:4000";

    // URL에 쿼리 파라미터 추가
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString
      ? `${baseURL}${url}?${queryString}`
      : `${baseURL}${url}`;

    const response = await fetch(fullUrl, {
      method, //get 디폴트
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "POST" ? JSON.stringify(params) : undefined,
    });

    if (!response.ok) {
      // 응답 실패 에러 상태 확인
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
