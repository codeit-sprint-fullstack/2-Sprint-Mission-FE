import instance from "@/api/api";

interface CustomAxiosRequestConfig {
  params?: object;
}

export async function getRequest(url: string, params: object = {}) {
  const config: CustomAxiosRequestConfig = params;
  return instance.get(url, config);
}

export async function postRequest(
  url: string,
  body: object = {},
  config?: any
) {
  return instance.post(url, body, config);
}

export async function patchRequest(
  url: string,
  body: object = {},
  config?: any
) {
  return instance.patch(url, body, config);
}

export async function deleteRequest(url: string, config?: any) {
  return instance.delete(url, config);
}
