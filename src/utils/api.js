import { axiosGet, axiosPatch, axiosPost } from './axiosUtils.js';

// const SERVER = 'https://panda-market-api.vercel.app/products';
// const SERVER = 'https://pandamarket-be.onrender.com/products'; // mongodb
// const SERVER = 'https://pandamarket-be-postgres.onrender.com/products'; // postgres
const SERVER = `http://localhost:3000`;

export async function getProducts(params = {}) {
  return await axiosGet(SERVER, '/products', params);
}

//#region article
export async function getArticles(params = {}) {
  return await axiosGet(SERVER, '/articles', params);
}

export async function getArticleById(id, params = {}) {
  return await axiosGet(SERVER, `/articles/${id}`, params);
}

export async function getCommentsOfArticle(id, params = {}) {
  return await axiosGet(SERVER, `/articles/${id}/comments`, params);
}

export async function postCommentOfArticle(id, data = {}) {
  return await axiosPost(SERVER, `/articles/${id}/comments`, data);
}

export async function postArticle(data = {}) {
  return await axiosPost(SERVER, '/articles', data);
}

export async function patchArticle(id, data = {}) {
  return await axiosPatch(SERVER, `/articles/${id}`, data);
}
//#endregion
