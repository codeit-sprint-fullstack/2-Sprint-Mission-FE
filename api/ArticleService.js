import axios from "axios";
const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app",
  timeout: 3000,
});

export async function getArticleList(params = {}) {
  const response = await instance.get("/articles", {
    params,
  });
  return response.data;
}

export async function getArticle(id) {
  const response = await instance.get(`/articles/${id}`);
  return response.data;
}

export async function createArticle(articleData) {
  const response = await instance.post("/articles", articleData);
  return response.data;
}

export async function patchArticle(id, articleData) {
  const response = await instance.patch(`/articles/${id}`, articleData);
  return response.data;
}

export async function deleteArticle(id) {
  const response = await instance.delete(`/articles/${id}`);
  return response.data;
}
