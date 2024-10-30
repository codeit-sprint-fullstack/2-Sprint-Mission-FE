import { postRequest, patchRequest, deleteRequest } from './api.js';

export async function postComment(id, data) {
  try {
    const response = await postRequest(`/articles/${id}/comments`, data);
    return response.data;
  } catch (error) {
    console.error('Error on posting an article:', error);
    throw error;
  }
}

export async function patchComment(articleId, commentId, data) {
  try {
    const response = await patchRequest(
      `/articles/${articleId}/comments/${commentId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error on patching a comment:', error);
    throw error;
  }
}

export async function deleteComment(articleId, commentId) {
  try {
    const response = await deleteRequest(
      `/articles/${articleId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error on deleting a comment:', error);
    throw error;
  }
}
