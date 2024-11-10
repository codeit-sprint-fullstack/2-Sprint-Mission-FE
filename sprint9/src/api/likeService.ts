import {
  getRequest,
  postRequest,
  patchRequest,
  putRequest,
  deleteRequest
} from "./api";

export async function postProduct(id: number) {
  try {
    const response = await postRequest(`/products/${id}/favorite`);
    return response.data;
  } catch (error) {
    console.error("Error on posting like:", error);
    throw error;
  }
}

export async function deleteComment(id: number) {
  try {
    const response = await deleteRequest(`/products/${id}/favorite`);
    return response.data;
  } catch (error) {
    console.error("Error on removing like", error);
    throw error;
  }
}
