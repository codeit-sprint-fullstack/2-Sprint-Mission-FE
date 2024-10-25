import {
    requestGet,
    requestPost,
    requestPatch,
    requestDelete,
  } from "./api.js";
  
  export async function getArticleList(params = {}) {
    try {
      const response = await requestGet(`/articles`, params);
      console.log("API Response:", response.data);  // 응답 데이터 확인
      return response.data;
    } catch(e) {
      console.error(e.message);
    }
  }
  
  export async function getArticle(id) {
    const response = await requestGet(`/articles/${id}`);
    return response.data;
  }
  
  export async function createArticle(ArticleData) {
    const response = await requestPost(`/articles`, ArticleData);
    return response.data;
  }
  
  export async function patchArticle(id, ArticleData) {
    const response = await requestPatch(`/articles/${id}`, ArticleData);
    return response.data;
  }
  
  export async function deleteArticle(id) {
    const response = await requestDelete(`/articles/${id}`);
    return response.data;
  }
  