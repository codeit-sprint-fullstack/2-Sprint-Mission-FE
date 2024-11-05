import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

instance.interceptors.request.use(
  (config) => {
    if (config.useToken) {
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
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      await instance.post('/auth/refresh-token', undefined, { _retry: true });
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(err);
  }
);

export async function get(url, params = {}, useToken = false) {
  try {
    return await instance.get(url, { params, useToken });
  } catch (error) {
    console.error(`GET 요청 에러: ${error.message}`);
    throw error;
  }
}

export async function post(url, body, useToken = false) {
  try {
    return await instance.post(url, body, { useToken });
  } catch (error) {
    console.error(`POST 요청 에러: ${error.message}`);
    throw error;
  }
}

export async function patch(url, body, useToken = false) {
  try {
    return await instance.patch(url, body, { useToken });
  } catch (error) {
    console.error(`PATCH 요청 에러: ${error.message}`);
    throw error;
  }
}

export async function remove(url, useToken = false) {
  try {
    return await instance.delete(url, { useToken });
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