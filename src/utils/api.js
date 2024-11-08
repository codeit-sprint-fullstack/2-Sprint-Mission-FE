import { axiosDelete, axiosGet, axiosPatch, axiosPost, axiosPut } from '@utils/axiosUtils';

// const SERVER = 'https://pandamarket-be.onrender.com/products'; // mongodb
// const SERVER = 'https://pandamarket-be-postgres.onrender.com/products'; // postgres
const SERVER = `http://localhost:3000`;
const CODEIT_SERVER = 'https://panda-market-api.vercel.app';

//#region user
/**
 * @async
 * @param {object} [params={}]
 */
export async function getMe(params = {}) {
  return axiosGet({ base: CODEIT_SERVER, url: '/users/me', params });
}
//#endregion

//#region product
/**
 * @async
 * @param {object} [params={}]
 */
export async function getProducts(params = {}) {
  return axiosGet({ base: SERVER, url: '/products', params });
}

/**
 * @async
 * @param {uuid} id
 * @param {object} [params={}]
 */
export async function getProductDetail(id, params = {}) {
  return axiosGet({ base: CODEIT_SERVER, url: `/products/${id}`, params });
}

/**
 * @async
 * @param {uuid} id
 * @param {object} [params={}]
 */
export async function getCommentsOfProduct(id, params = {}) {
  return axiosGet({ base: CODEIT_SERVER, url: `/products/${id}/comments`, params });
}
//#endregion

//#region article
/**
 * @async
 * @param {object} [params={}]
 */
export async function getArticles(params = {}) {
  return axiosGet({ base: SERVER, url: '/articles', params });
}

/**
 * @async
 * @param {uuid} id
 * @param {object} [params={}]
 */
export async function getArticleById(id, params = {}) {
  return axiosGet({ base: SERVER, url: `/articles/${id}`, params });
}

/**
 * @async
 * @param {uuid} id
 * @param {object} [params={}]
 */
export async function getCommentsOfArticle(id, params = {}) {
  return axiosGet({ base: SERVER, url: `/articles/${id}/comments`, params });
}

/**
 * @async
 * @param {uuid} id
 * @param {{content: string, ownerId: uuid}} [data={}]
 */
export async function postCommentOfArticle(id, data = {}) {
  return axiosPost({ base: SERVER, url: `/articles/${id}/comments`, data });
}

/**
 * @async
 * @param {{
 *  title: string,
 *  content: string,
 *  images?: string[],
 *  ownerId: Uuid
 * }} [data={}]
 */
export async function postArticle(data = {}) {
  return axiosPost({ base: SERVER, url: '/articles', data });
}

/**
 * @async
 * @param {uuid} id
 * @param {{
 *  title?: string,
 *  content?: string,
 *  images?: string[],
 * }} [data={}]
 */
export async function patchArticle(id, data = {}) {
  return axiosPatch({ base: SERVER, url: `/articles/${id}`, data });
}
//#endregion

//#region comment
/**
 * @async
 * @param {uuid} id
 * @param {{content: string}} [data={}]
 */
export async function patchComment(id, data = {}) {
  return axiosPatch({ base: SERVER, url: `/comments/${id}`, data });
}

/**
 * @async
 * @param {uuid} id
 * @param {{
 *  id: uuid
 *  content: string
 *  ownerId: uuid
 *  articleId: uuid
 *  productId: uuid
 *  createdAt: DateTime
 *  updatedAt: DateTime
 * }} [data={}]
 */
export async function putComment(id, data = {}) {
  return axiosPut({ base: SERVER, url: `/comments/${id}`, data });
}

/**
 * @async
 * @param {uuid} id
 */
export async function deleteComment(id) {
  return axiosDelete({ base: SERVER, url: `/comments/${id}` });
}
//#endregion

//#region auth
/**
 * @async
 * @param {{ email: string; nickname: string; password: string; passwordConfirmation: string; }} [data={}]
 */
export async function signUp(data = {}) {
  return axiosPost({ base: CODEIT_SERVER, url: '/auth/signUp', data });
}

/**
 * @async
 * @param {{email: string, password: string}} [data={}]
 */
export async function signIn(data = {}) {
  return axiosPost({ base: CODEIT_SERVER, url: '/auth/signIn', data });
}

/**
 * @async
 * @param {{refreshToken: string}} [data={}]
 */
export async function refreshToken(data = {}) {
  return axiosPost({ base: CODEIT_SERVER, url: '/auth/refresh-token', data });
}
//#endregion
