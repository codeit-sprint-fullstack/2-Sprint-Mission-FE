import axios from "axios";
export const instance = axios.create({
  // baseURL: "https://comazon-4iuc.onrender.com"
  baseURL: "http://localhost:3001"
});
export const getProducts = async (params) => {
  const response = await instance.get(`/products`, { params });
  return response;
};
export const getProduct = async (id) => {
  const response = await instance.get(`/products/${id}`);
  return response;
};
export const getProductWithComments = async ({ id, params }) => {
  const response = await instance.get(`/products/${id}/withComments`, {
    params
  });

  return response;
};
export const postProduct = async (formData) => {
  const response = await instance.post("/products", formData);
  return response;
};
export const patchProduct = async ({ id, formData }) => {
  const response = await instance.patch(`/products/${id}`, formData);
  return response;
};
export const deleteProduct = async (id) => {
  const response = await instance.delete(`/products/${id}`);
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
/*************************productComments***************************************** */
export const postProductComment = async (fomrData) => {
  const response = await instance.post("/product-comments", fomrData);
  return response;
};
export const patchProductComment = async ({ id, formData }) => {
  const response = await instance.patch(`/product-comments/${id}`, formData);
  return response;
};
export const deleteProductComment = async (id) => {
  const response = await instance.delete(`/product-comments/${id}`);
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
