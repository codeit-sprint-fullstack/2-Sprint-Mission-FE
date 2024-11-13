import axios from 'axios';
import { isEmpty } from '@utils/utils';

const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
});

const HTTP_STATUS = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
});

/**
 * 실제로 axios를 이용해 통신하고 데이터를 처리
 *
 * @async
 * @param {{ base: string, url: string, method: HTTP_METHODS, data?: object, params?: object, headers?: object }}
 */
async function axiosData({ base, url, method, data = {}, params = {}, headers = { 'Content-Type': 'application/json' } }) {
  if (!url || !method) throw new Error('URL and Method is required');
  if (!HTTP_METHODS[method]) throw new Error('Invalid HTTP method');

  const instance = axios.create({
    baseURL: base,
    headers,
    validateStatus: status => 200 <= status && status < 300, // res.ok와 동일한 조건
  });

  // NOTE 요청 인터셉터
  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('accessToken');

      // NOTE 토큰이 존재하면 요청 헤더에 첨부
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // NOTE 응답 인터셉터
  instance.interceptors.response.use(
    // NOTE validateStatus를 통과함 == res.ok
    // 반환된 response를 가공해서 반환한다.
    response => ({ ...response, data: response.data.data || response.data }), // NOTE data가 중첩된 경우에 일관적으로 사용할 수 있도록 하는 코드
    // NOTE validateStatus를 통과하지 못함 == !res.ok
    // 반환된 error를 이용해 에러처리를 한다.
    error => {
      // NOTE 에러 응답 상세 내용 확인
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Request data:', error.config?.data);
      return Promise.reject(error);
    },
  );

  const res = await instance({ method, url, data, params });

  // NOTE 204 case
  if (res.status === HTTP_STATUS.NO_CONTENT && isEmpty(res.data)) return res.status;

  return res.data;
}

/**
 * axios get요청 래퍼함수
 *
 * @async
 * @param {{base: string, url: string, params: object}}
 */
export async function axiosGet({ base, url, params, headers }) {
  return axiosData({ base, url, method: HTTP_METHODS.GET, params, headers });
}

/**
 * axios post요청 래퍼함수
 *
 * @async
 * @param {{base: string, url: string, data: object}}
 */
export async function axiosPost({ base, url, data, headers }) {
  return axiosData({ base, url, method: HTTP_METHODS.POST, data, headers });
}

/**
 * axios patch요청 래퍼함수
 *
 * @async
 * @param {{base: string, url: string, data: object}}
 */
export async function axiosPatch({ base, url, data, headers }) {
  return axiosData({ base, url, method: HTTP_METHODS.PATCH, data, headers });
}

/**
 * axios put요청 래퍼함수
 *
 * @async
 * @param {{base: string, url: string, data: object}}
 */
export async function axiosPut({ base, url, data, headers }) {
  return axiosData({ base, url, method: HTTP_METHODS.PUT, data, headers });
}

/**
 * axios delete요청 래퍼함수
 *
 * @async
 * @param {{base: string, url: string, params: object}}
 */
export async function axiosDelete({ base, url, params, headers }) {
  return axiosData({ base, url, method: HTTP_METHODS.DELETE, params, headers });
}
