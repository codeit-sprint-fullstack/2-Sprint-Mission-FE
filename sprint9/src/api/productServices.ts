import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

export async function getProducts({ order = "", searchKeyword = "" } = {}) {
  try {
    const response = await getRequest(`/articles`, {
      order,
      search: searchKeyword
    });
    return response.data;
  } catch (error) {
    console.error("Error on getting articles", error);
    throw error;
  }
}

export async function getProduct(id: string) {
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

export async function deleteProduct(id: string) {
  try {
    const response = await deleteRequest(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error on removing an article:", error);
    throw error;
  }
}
