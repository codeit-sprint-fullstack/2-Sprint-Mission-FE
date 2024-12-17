import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        window.location.href = '/signin';
        return Promise.reject(err);
      }

      try {
        const response = await instance.post('/auth/refresh-token', {
          refreshToken
        });
        const newAccessToken = response.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    // 상태 코드에 따른 에러 처리
    const status = err.response?.status;
    const message =
      err.response?.data?.message || '알 수 없는 오류가 발생했습니다.';

    switch (status) {
      case 400:
        console.error('잘못된 요청입니다.', message);
        alert('잘못된 요청입니다. 입력 값을 확인해주세요.');
        break;
      case 403:
        console.error('권한이 없습니다.', message);
        alert('이 작업을 수행할 권한이 없습니다.');
        break;
      case 404:
        console.error('리소스를 찾을 수 없습니다.', message);
        alert('요청하신 리소스를 찾을 수 없습니다.');
        break;
      case 500:
        console.error('서버 오류입니다.', message);
        alert('서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        break;
      default:
        console.error('알 수 없는 오류가 발생했습니다.', message);
        alert(message);
        break;
    }

    return Promise.reject(err);
  }
);

export async function get(url, params = {}) {
  try {
    return await instance.get(url, { params });
  } catch (error) {
    console.error(`GET 요청 에러: ${error.message}`);
    throw error;
  }
}

export async function post(url, body, config = {}) {
  try {
    return await instance.post(url, body, config);
  } catch (error) {
    console.error(`POST 요청 에러: ${error.message}`);
    throw error;
  }
}

export async function patch(url, body) {
  try {
    return await instance.patch(url, body);
  } catch (error) {
    console.error(`PATCH 요청 에러: ${error.message}`);
    throw error;
  }
}

export async function remove(url) {
  try {
    return await instance.delete(url);
  } catch (error) {
    console.error(`DELETE 요청 에러: ${error.message}`);
    throw error;
  }
}

const method = {
  get,
  post,
  patch,
  remove
};

export default method;
