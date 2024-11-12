import {
    requestGet,
    requestPost,
    requestPatch,
    requestDelete,
  } from "./api.js";
  
  export async function getArticleList(params = {}) {
    try {
      const response = await requestGet(`/articles`, params);
      return response.data;
    } catch(e) {
      console.error(e.message);
    }
  }
  
  export async function getArticle(id) {
    try {
    const response = await requestGet(`/articles/${id}`);
    return response.data;
    } catch (e) {
      console.error(e.message);
    }
  }
  
  export async function createArticle(ArticleData) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access Token is missing");
      return;
    }

    try {
      const response = await requestPost(`/articles`, ArticleData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('response:', response);

      return response.data;
    } catch (e) {
      console.error(e.message);
    }
  }
  
  
  export async function patchArticle(id, ArticleData) {
    const response = await requestPatch(`/articles/${id}`, ArticleData);
    return response.data;
  }
  
  export async function deleteArticle(id) {
    const response = await requestDelete(`/articles/${id}`);
    return response.data;
  }
  