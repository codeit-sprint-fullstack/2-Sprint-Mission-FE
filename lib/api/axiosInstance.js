import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    // 클라이언트에서만 실행되도록 설정
    if (typeof window !== 'undefined' && config.url !== '/auth/refresh-token') {
      // 요청을 보내기 전에 accessToken을 추가
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    let errorMessage = '요청 중 문제가 발생했습니다. 다시 시도해주세요.';

    if (error.response) {
      const originalRequest = error.config;
      const status = error.response.status;

      // 401 에러 처리 및 토큰 갱신 로직
      if (
        status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/auth/refresh-token'
      ) {
        originalRequest._retry = true; // 재시도 플래그 설정
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          try {
            // 새 accessToken 요청
            const response = await instance.post(
              '/auth/refresh-token',
              { refreshToken }
            );
            const newAccessToken = response.accessToken;
            // 새로운 토큰 저장 및 원래 요청에 설정
            localStorage.setItem('accessToken', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            
            // 원래 요청 재시도
            return instance(originalRequest);
          } catch (refreshError) {
            console.error('토큰 갱신 실패:', refreshError);
            // 토큰 갱신 실패 시 처리
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/signin';

            return Promise.reject(refreshError);
          }
        }
        else {
          // refreshToken이 없으면 로그인 페이지로 리다이렉트
          localStorage.removeItem('accessToken'); // 남아 있는 accessToken 제거
          //window.location.href = '/signin';
          return Promise.reject(error);
        }
      } 
      // 404 에러 검출
      else if (status === 404) {
        console.error('API 응답 에러: 요청한 리소스를 찾을 수 없습니다.');
        errorMessage = '요청한 리소스를 찾을 수 없습니다.';
      } else {
        console.error(
          'API 응답 에러:',
          error.response.data.message || error.response.statusText
        );
        errorMessage =
          error.response.data.message ||
          error.response.statusText ||
          '서버에서 오류가 발생했습니다.';
      }
    } else if (error.request) {
      console.error('API 요청 실패:', error.request);
      errorMessage = '서버와 연결할 수 없습니다. 네트워크를 확인해주세요.';
    } else {
      console.error('API 요청 중 에러 발생:', error.message);
      errorMessage =
        error.message || '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    }

    error.message = errorMessage;
    return Promise.reject(error);
  }
);

export default instance;
