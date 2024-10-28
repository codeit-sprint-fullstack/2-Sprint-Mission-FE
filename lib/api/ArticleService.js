import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/'
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('주의 : 에러 발생!', err);
    throw err;
  }
);

async function get(url, params = {}) {
  return instance.get(url, { params });
}

async function post(url, body) {
  return instance.post(url, body);
}

async function patch(url, body) {
  return instance.patch(url, body);
}

async function remove(url) {
  return instance.delete(url);
}

export async function getArticleList({ page, pageSize, order, keyword }) {
  const res = await get('/articles', {
    params: { page, pageSize, order, keyword }
  });
  return res.data;
}

export async function getArticle(id) {
  const res = await get(`/articles/${id}`);
  return res.data;
}

export async function createArticle(article) {
  const res = await post('/articles', article);
  return res.data;
}

export async function patchArticle(id, article) {
  const res = await patch(`/articles/${id}`, article);
  return res.data;
}

export async function deleteArticle(id) {
  const res = await remove(`/articles/${id}`);
  return res.data;
}

const articles = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};

export default articles;
