import {
    requestGet,
    requestPost,
    requestPatch,
    requestDelete,
  } from "./api.js";
  
  export async function getCommentList(params = {}) {
    try {
      const response = await requestGet(`/comments`, params);
      return response.data;
    } catch(e) {
      console.error(e.message);
    }
  }
  
  export async function getProductComment(productId, params = {}) {
    try {
    const response = await requestGet(`/products/${productId}/comments`, params);
    return response.data;
    } catch (e) {
      console.error(e.message);
    }
  }

  export async function getArticleComment(articleId, params = {}) {
    try {
    const response = await requestGet(`/articles/${articleId}/comments`, params);
    return response.data;
    } catch (e) {
      console.error(e.message);
    }
  }
  
  export async function createArticleComment(id, CommentData) {
    const response = await requestPost(`/articles/${id}/comments`, CommentData);
    return response.data;
  }

  export async function createProductComment(id, CommentData) {
    const response = await requestPost(`/products/${id}/comments`, CommentData);
    return response.data;
  }
  
  export async function patchComment(id, CommentData) {
    const response = await requestPatch(`/comments/${id}`, CommentData);
    return response.data;
  }
  
  export async function deleteComment(id) {
    const response = await requestDelete(`/comments/${id}`);
    return response.data;
  }