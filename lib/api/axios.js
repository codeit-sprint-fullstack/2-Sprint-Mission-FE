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
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await instance.post('/auth/refresh-token', { refreshToken });
        originalRequest._retry = true;
        return instance(originalRequest);
      } else {
        window.location.href = '/signin';
      }
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
