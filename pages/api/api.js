import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  // baseURL: "https://pandamarket-3uzp.onrender.com",
  // baseURL: "http://localhost:3001",
  // timeout: 10000,
  // withCredentials: true,
});

instance.interceptors.response.use(res => res, async (error) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && !originalRequest._retry) {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const refreshResponse = await instance.post('/auth/refresh-token', { refreshToken });
      
      if (refreshResponse && refreshResponse.data.accessToken) {
        localStorage.setItem('accessToken', refreshResponse.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        originalRequest._retry = true;

        return instance(originalRequest);
      }
    } catch (e) {
      console.error('refresh token error: ', e.message);
    }
  }
  return Promise.reject(error);
});

export default instance;

export async function requestGet(url, params = {}, headers = {}) {
  try {
    return await instance.get(url, { params, headers });
  } catch (e) {
    console.error('get error: ', e.message);
  }
}

export async function requestPost(url, data) {
  try {
    const response = await instance.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (e) {
    console.error('post error: ', e.message);
    throw e;
  }
}

export async function requestPatch(url, data) {
  try {
    return await instance.patch(url, data);
  } catch (e) {
    console.error('patch error: ', e.message);
  }
}

export async function requestDelete(url) {
  try {
    return await instance.delete(url);
  } catch (e) {
    console.error('delete error: ', e.message);
  }
}