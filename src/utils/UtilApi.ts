import instance from "@/api/api";

interface CustomAxiosRequestConfig {
  params?: object;
}

export async function getRequest(url: string, params: object = {}) {
  const config: CustomAxiosRequestConfig = params;
  return instance.get(url, config);
}

export async function postRequest(url: string, body: object = {}) {
  return instance.post(url, body);
}

export async function patchRequest(url: string, body: object = {}) {
  return instance.patch(url, body);
}

export async function deleteRequest(url: string) {
  return instance.delete(url);
}
