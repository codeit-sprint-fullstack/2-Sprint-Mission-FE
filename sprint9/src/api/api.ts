import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER
  // timeout: 5000
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API request error:", error);
    throw error;
  }
);

export function getRequest(url: string, params: object) {
  return instance.get(url, params);
}

export function postRequest(url: string, body: object) {
  return instance.post(url, body);
}

export function patchRequest(url: string, body: object) {
  return instance.patch(url, body);
}

export function deleteRequest(url: string) {
  return instance.delete(url);
}
