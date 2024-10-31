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
  try {
    return await instance.get(url, { params });
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
