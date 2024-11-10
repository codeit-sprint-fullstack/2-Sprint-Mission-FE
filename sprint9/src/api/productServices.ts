import {
  getRequest,
  postRequest,
  patchRequest,
  putRequest,
  deleteRequest
} from "./api";

export async function getProducts() {
  try {
    const response = await getRequest(`/products`);
    return response.data;
  } catch (error) {
    console.error("Error on getting articles", error);
    throw error;
  }
}

export async function getProduct(id: number) {
  try {
    const response = await getRequest(`/products/${id}`, {});
    return response.data;
  } catch (error) {
    console.error("Error on getting an article", error);
    throw error;
  }
}

export async function postProduct(data: object) {
  try {
    const response = await postRequest(`/products`, data);
    return response.data;
  } catch (error) {
    console.error("Error on posting an article:", error);
    throw error;
  }
}

export async function patchProduct(id: string, data: object) {
  try {
    const response = await patchRequest(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error on patching an article:", error);
    throw error;
  }
}

//NOTE: 이자식 작동 안됨
export async function putProduct(id: string, data: object) {
  try {
    const response = await putRequest(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error on patching an article:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await deleteRequest(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error on removing an article:", error);
    throw error;
  }
}
