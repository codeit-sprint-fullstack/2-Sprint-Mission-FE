import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  timeout: 5000
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('API request error:', error);
    throw error;
  }
);

export function getRequest(url, params) {
  return instance.get(url, { params });
}

export function postRequest(url, body) {
  return instance.post(url, body);
}

export function patchRequest(url, body) {
  return instance.patch(url, body);
}

export function deleteRequest(url) {
  return instance.delete(url);
}
