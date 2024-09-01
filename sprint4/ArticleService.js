import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app",
});

export async function getArticleList(page, pageSize, keyword) {
  return await instance
    .get("/articles", {
      params: { page, pageSize, keyword },
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}

export async function getArticle(id) {
  return await instance
    .get(`/articles/${id}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}

export async function createArticle({ title, content, image }) {
  return await instance
    .post(`/articles/`, {
      title: title,
      content: content,
      image: image,
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}

export async function patchArticle(id, { title, content, image }) {
  return await instance
    .patch(`/articles/${id}`, {
      title: title,
      content: content,
      image: image,
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}

export async function deleteArticle(id) {
  return await instance
    .delete(`/articles/${id}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}
