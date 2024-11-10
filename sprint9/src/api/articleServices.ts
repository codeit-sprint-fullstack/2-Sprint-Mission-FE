import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

export async function getArticles({ order = "", searchKeyword = "" } = {}) {
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

export async function getArticle(id: number) {
  try {
    const response = await getRequest(`/articles/${id}`, {});
    return response.data;
  } catch (error) {
    console.error("Error on getting an article", error);
    throw error;
  }
}

export async function postArticle(data: object) {
  try {
    const response = await postRequest(`/articles`, data);
    return response.data;
  } catch (error) {
    console.error("Error on posting an article:", error);
    throw error;
  }
}

export async function patchArticle(id: number, data: object) {
  try {
    const response = await patchRequest(`/articles/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error on patching an article:", error);
    throw error;
  }
}

export async function deleteArticle(id: number) {
  try {
    const response = await deleteRequest(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error on removing an article:", error);
    throw error;
  }
}
