/* 
 * 사용안함 참고용 소스입니다. 
 * 여기서는 apiService.js 를 사용합니다.
 */

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    // 클라이언트에서만 실행되도록 설정
    if ((typeof window !== 'undefined')) {
      // 요청을 보내기 전에 accessToken을 추가
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res.data, 
  async (error) => {
    // 401 에러 검출
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest); // 새 토큰으로 재시도
      } else {
        // 리프레시 토큰이 없거나 갱신에 실패하면 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
      }
    }

    let errorMessage = '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    if (error.response) {
      const status = error.response.status;
      // 404 에러 검출
      if (status === 404) {
        console.error('API 응답 에러: 요청한 리소스를 찾을 수 없습니다.');
        errorMessage = '요청한 리소스를 찾을 수 없습니다.';
      } else {
        console.error('API 응답 에러:', error.response.data.message || error.response.statusText);
        errorMessage = error.response.data.message || error.response.statusText || '서버에서 오류가 발생했습니다.';
      }
    } else if (error.request) {
      console.error('API 요청 실패:', error.request);
      errorMessage = '서버와 연결할 수 없습니다. 네트워크를 확인해주세요.';
    } else {
      console.error('API 요청 중 에러 발생:', error.message);
      errorMessage = error.message || '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    }
    error.message = errorMessage;
    return Promise.reject(error);
  }
);

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await instance.post('/auth/refresh-token', { refreshToken });
    const newAccessToken = response.accessToken;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return null;
  }
}

export default instance;