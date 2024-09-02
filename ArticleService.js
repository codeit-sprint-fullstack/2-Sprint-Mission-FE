import { requestGet, requestPost, requestPatch, requestDelete } from "./api.mjs";

export async function getArticleList(params = {}) {
  const response = await requestGet('/articles', params);
  return response.data;
}

export async function getArticle(id) {
  const response = await requestGet(`.articles/${id}`);
  return response.data;
}

export async function createArticle(articleData) {
  const response = await requestPost('/articles', articleData);
  return response.data;
}

export async function patchArticle(id, articledata) {
  const response = await requestPatch(`/articles/${id}`, articleData);
  return response.data;
}

export async function deleteArticle(id, articleData) {
  const response = await requestPatch(`/articles/${id}`, articleData);
  return response.data;
}