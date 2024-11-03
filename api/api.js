import axios from "axios";
export const instance = axios.create({
  // baseURL: "https://comazon-4iuc.onrender.com"
  baseURL: "http://localhost:3001"
});
export const getProducts = async (params) => {
  const response = await instance.get(`/products`, { params });
  return response;
};
export const postProduct = async (formData) => {
  const response = await instance.post("/products", formData);
  return response;
};
/*******************Aritlce*********************************************/
export const getArticles = async (params) => {
  const response = await instance.get("/articles", { params });
  return response;
};
export const getArticle = async (id) => {
  const response = await instance.get(`articles/${id}`);
  return response;
};
export const getArticleWithComments = async ({ id, params }) => {
  console.log(`id: ${id}`);
  console.log(`params: ${params}`);
  const response = await instance.get(`articles/${id}/withcomments`, {
    params
  });
  return response;
};
export const postArticle = async (formData) => {
  const response = await instance.post("/articles", formData);
  return response;
};
export const patchArticle = async ({ id, formData }) => {
  const response = await instance.patch(`/articles/${id}`, formData);
  return response;
};
export const deleteArticle = async (id) => {
  const response = await instance.delete(`/articles/${id}`);
  return response;
};

/************************articleComments**********************************/
export const postArticleComment = async (formData) => {
  const response = await instance.post("/article-comments", formData);
  return response;
};
export const patchArticleComment = async ({ id, formData }) => {
  const response = await instance.patch(`/article-comments/${id}`, formData);
  return response;
};
export const deleteArticleComment = async (id) => {
  const response = await instance.delete(`/article-comments/${id}`);
  return response;
};
