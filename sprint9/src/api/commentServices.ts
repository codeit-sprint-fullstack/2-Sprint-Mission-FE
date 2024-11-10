import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

export async function getComment(id: number, limit: number) {
  try {
    const response = await getRequest(
      `/products/${id}/comments`,
      {
        limit
      },
      false
    );
    return response.data;
  } catch (error) {
    console.error("Error on fetching data", error);
    throw error;
  }
}

export async function postComment(id: number, data: object) {
  try {
    const response = await postRequest(`/products/${id}/comments`, data);
    return response.data;
  } catch (error) {
    console.error("Error on fetching data", error);
    throw error;
  }
}

export async function patchComment(id: number, data: object) {
  try {
    const response = await patchRequest(`/comments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error on fetching data", error);
    throw error;
  }
}

export async function deleteComment(id: number) {
  try {
    const response = await deleteRequest(`/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error on fetching data", error);
    throw error;
  }
}
