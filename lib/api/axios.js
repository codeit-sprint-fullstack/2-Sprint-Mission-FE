import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('주의 : 에러 발생!', err.response ? err.response.data : err);
    throw err;
  }
);

export async function get(url, params = {}) {
  const token = localStorage.getItem('accessToken'); // 토큰을 가져옵니다.
  try {
    return await instance.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${token}` // 토큰을 헤더에 추가합니다.
      }
    });
  } catch (error) {
    console.error(`GET 요청 에러: ${error.message}`);
    throw error;
  }
}

export async function post(url, body) {
  try {
    return await instance.post(url, body);
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
