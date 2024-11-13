import axios from "axios";
import { TOKEN } from "@/constants";
const { ACCESS_TOKEN, REFRESH_TOKEN } = TOKEN;
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST
});
instance.interceptors.request.use(
  (config) => {
    // 토큰이 필요 없는 요청의 URL을 확인
    const noAuthRequiredEndpoints = [
      "/auth/signIn",
      "/auth/signUp",
      "/products",
      "/articles"
    ];
    // 요청 URL이 noAuthRequiredEndpoints에 포함되어 있지 않을 경우
    if (!noAuthRequiredEndpoints.includes(config.url)) {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    try {
      if (error.response && error.response.status === 401) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOST}/auth/refresh-token`,
          { refreshToken }
        );
        const { accessToken } = data;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      }
    } catch (error) {
      throw error;
    }
    throw error;
  }
);
export const getUser = async () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken !== undefined) {
    const response = await instance.get("/users/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response;
  }
};
export const postUser = async (formData) => {
  const response = await instance.post("auth/signUp", formData);
  return response;
};
export const postUserLogin = async (formData) => {
  const response = await instance.post("auth/signIn", formData);
  return response;
};
/****************************PRODUCT*********************************************** */
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
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken !== undefined) {
    const response = await instance.post("/products", formData, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response;
  }
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
export const getProductComments = async ({ id, params }) => {
  const response = await instance.get(`products/${id}/comments`, { params });
  return response;
};
export const postProductComment = async ({ id, formData }) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const response = await instance.post(`/products/${id}/comments`, formData, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response;
};
export const patchProductComment = async ({ id, formData }) => {
  const response = await instance.patch(`/comments/${id}`, formData);
  return response;
};
export const deleteProductComment = async (id) => {
  const response = await instance.delete(`/comments/${id}`);
  return response;
};
/************************articleComments**********************************/
export const getArticleComments = async ({ id, params }) => {
  const response = await instance.get(`articles/${id}/comments`, { params });
  return response;
};
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
