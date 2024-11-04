import axios from 'axios';

const instance = axios.create({
  //baseURL: process.env.API_BASE_URL,
  baseURL: "https://panda-market-api.vercel.app"
});

instance.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 accessToken을 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res.data, 
  (error) => {
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

export default instance;