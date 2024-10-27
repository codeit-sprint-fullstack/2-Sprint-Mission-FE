import axios from 'axios';
import isEmpty from './isEmpty.js';
import c from './constants.js';

const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
});

async function axiosData({ base, url, method, data = {}, params = {} }) {
  if (!url || !method) throw new Error('URL and Method is required');
  if (!HTTP_METHODS[method]) throw new Error('Invalid HTTP method');

  const instance = axios.create({
    baseURL: base,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await instance({ method, url, data, params });

  // NOTE 204 case
  if (res.status === c.HTTP_STATUS.NO_CONTENT && isEmpty(res.data)) return res.status;

  return res.data;
}

export async function axiosGet(base, url, params) {
  return axiosData({ base, url, method: HTTP_METHODS.GET, params });
}

export async function axiosPost(base, url, data) {
  return axiosData({ base, url, method: HTTP_METHODS.POST, data });
}

export async function axiosPatch(base, url, data) {
  return axiosData({ base, url, method: HTTP_METHODS.PATCH, data });
}

export async function axiosPut(base, url, data) {
  return axiosData({ base, url, method: HTTP_METHODS.PUT, data });
}

export async function axiosDelete(base, url, data) {
  return axiosData({ base, url, method: HTTP_METHODS.DELETE, data });
}
