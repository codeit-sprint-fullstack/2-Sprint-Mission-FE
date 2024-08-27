import axios from 'axios';

const instance = axios.create({
  baseURL: `https://sprint-mission-api.vercel.app`,
});

// * params = {page, pageSize, keyword}
const getArticleList = async (params = {}) => {
  const res = await axios.get(`/articles`, {params});
  return res.data;
};

const getArticle = async (id) => {
  const res = await axios.get(`/articles/${id}`);
  return res.data;
};

/*
data = {
  "title": "string",
  "content": "string",
  "image": "string"
};
 */
const createArticle = async (data = {}) => {
  const res = await axios.post(`/articles`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

const patchArticle = async (id, data) => {
  const res = await axios.patch(`/articles/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

const deleteArticle = async (id) => {
  const res = await axios.delete(`/articles/${id}`);
  return res.data;
}
