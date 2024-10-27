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
  
  export async function getProductComment(productId) {
    try {
    const response = await requestGet(`/products/${productId}/comments`);
    return response.data;
    } catch (e) {
      console.error(e.message);
    }
  }

  export async function getArticleComment(articleId) {
    try {
    const response = await requestGet(`/articles/${articleId}/comments`);
    return response.data;
    } catch (e) {
      console.error(e.message);
    }
  }
  
  export async function createComment(CommentData) {
    const response = await requestPost(`/comments`, CommentData);
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