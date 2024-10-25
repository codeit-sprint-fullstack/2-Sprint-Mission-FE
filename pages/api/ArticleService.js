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
    const formData = new FormData();
    formData.append("title", ArticleData.title);
    formData.append("content", ArticleData.content);
    ArticleData.images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await requestPost(`/articles`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
  