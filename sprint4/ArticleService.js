import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app",
});

export function getArticleList(page, pageSize, keyword) {
  return instance
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

export function getArticle(id) {
  return instance
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

export function createArticle({ title, content, image }) {
  return instance
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

export function patchArticle(id, { title, content, image }) {
  return instance
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

export function deleteArticle(id) {
  return instance
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
