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
            // 응답에서 새로운 토큰 추출
            const { accessToken: newAccessToken, newRefreshToken } = response; 

            // 새 accessToken으로 원래 요청 설정
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // 위 코드의 문제점은 서버에서 refreshToken 이 전달되지 않으면 무한루프가 걸림
                   
            // 새로운 accessToken 저장
            if (newAccessToken) {
              localStorage.setItem('accessToken', newAccessToken);
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            } else {
              console.warn('accessToken이 서버 응답에 없습니다.');
              throw new Error('accessToken이 서버 응답에 없습니다.');
            }

            /*
            * - 서버에서 refreshToken이 전달되지 않는 경우,
            *   프론트엔드가 계속 기존 refreshToken으로 요청을 반복하며 무한루프 발생 가능 있어 검증함.
            */
            // 새로운 refreshToken 저장
            if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
            } else {
              console.warn('refreshToken이 서버 응답에 없습니다.');
              // refreshToken 누락 시 필요한 처리 추가
              localStorage.removeItem('refreshToken'); // 기존 refreshToken 삭제
            }

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
          localStorage.removeItem('accessToken'); // 남아 있는 accessToken 제거
          localStorage.removeItem('refreshToken'); 
          // window.location.href = '/signin';  //무한루프 걸림
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
