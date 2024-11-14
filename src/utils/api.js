import { axiosDelete, axiosGet, axiosPatch, axiosPost, axiosPut } from '@utils/axiosUtils';

// const SERVER = 'https://pandamarket-be.onrender.com/products'; // mongodb
// const SERVER = 'https://pandamarket-be-postgres.onrender.com/products'; // postgres
const SERVER = `http://localhost:3000`;
const CODEIT_SERVER = 'https://panda-market-api.vercel.app';

//#region user
/**
 * @async
 * @param {object} [headers={}]
 */
// export async function getMe(headers = {}) {
//   return axiosGet({ base: CODEIT_SERVER, url: '/users/me', headers });
// }
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
  return axiosGet({ base: SERVER, url: `/products/${id}`, params });
}

/**
 * @async
 * @param {{
 *  images: string[]
 *  tags: string[]
 *  price: int
 *  description: string
 *  name: string
 * }} [data={}]
 */
export async function postProduct(data = {}) {
  return axiosPost({ base: SERVER, url: '/products', data, headers: { 'Content-Type': 'multipart/form-data' } });
}

/**
 * @async
 * @param {uuid} id
 * @param {{
 *  images?: string[]
 *  tags?: string[]
 *  price?: int
 *  description?: string
 *  name?: string
 * }} [data={}]
 */
export async function patchProduct(id, data = {}) {
  return axiosPatch({ base: SERVER, url: `/products/${id}`, data });
}

/**
 * @async
 * @param {uuid} id
 */
export async function deleteProduct(id) {
  return axiosDelete({ base: SERVER, url: `/products/${id}` });
}

/**
 * @async
 * @param {uuid} id
 */
export async function postProductLike(id) {
  return axiosPost({ base: SERVER, url: `/products/${id}/like` });
}

/**
 * @async
 * @param {uuid} id
 */
export async function deleteProductLike(id) {
  return axiosDelete({ base: SERVER, url: `/products/${id}/like` });
}

/**
 * @async
 * @param {uuid} id
 * @param {object} [params={}]
 */
export async function getCommentsOfProduct(id, params = {}) {
  return axiosGet({ base: SERVER, url: `/products/${id}/comments`, params });
}

/**
 * @async
 * @param {uuid} id
 * @param {{content: string}} [data={}]
 */
export async function postCommentOfProduct(id, data = {}) {
  return axiosPost({ base: SERVER, url: `/products/${id}/comments`, data });
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

/**
 * @async
 * @param {uuid} id
 */
export async function deleteArticle(id) {
  return axiosDelete({ base: SERVER, url: `/articles/${id}` });
}
//#endregion

//#region comment
/**
 * @async
 * @param {uuid} id
 * @param {{content: string}} [data={}]
 */
export async function patchComment(id, data = {}) {
  return axiosPatch({ base: CODEIT_SERVER, url: `/comments/${id}`, data });
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
  return axiosDelete({ base: CODEIT_SERVER, url: `/comments/${id}` });
}
//#endregion

//#region auth
/**
 * @async
 * @param {object} [headers={}]
 */
export async function getMe(headers = {}) {
  return axiosGet({ base: SERVER, url: '/auth/me', headers });
}

/**
 * @async
 * @param {{ email: string; nickname: string; password: string; passwordConfirmation: string; }} [data={}]
 */
export async function signUp(data = {}) {
  return axiosPost({ base: SERVER, url: '/auth/signUp', data });
}

/**
 * @async
 * @param {{email: string, password: string}} [data={}]
 */
export async function signIn(data = {}) {
  return axiosPost({ base: SERVER, url: '/auth/signIn', data });
}

/**
 * @async
 * @param {{refreshToken: string}} [data={}]
 */
export async function refreshToken(data = {}) {
  return axiosPost({ base: SERVER, url: '/auth/refresh', data });
}
//#endregion

export async function getOneUser(params = { pageSize: 1 }) {
  return axiosGet({ base: SERVER, url: '/dev/users', params });
}
