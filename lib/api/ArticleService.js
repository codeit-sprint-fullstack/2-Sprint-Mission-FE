import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/'
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('주의 : 에러 발생!', err.response ? err.response.data : err);
    throw err;
  }
);

async function get(url, params = {}) {
  try {
    return await instance.get(url, { params });
  } catch (error) {
    console.error(`GET 요청 에러: ${error.message}`);
    throw error;
  }
}

async function post(url, body) {
  try {
    return await instance.post(url, body);
  } catch (error) {
    console.error(`POST 요청 에러: ${error.message}`);
    throw error;
  }
}

async function patch(url, body) {
  try {
    return await instance.patch(url, body);
  } catch (error) {
    console.error(`PATCH 요청 에러: ${error.message}`);
    throw error;
  }
}

async function remove(url) {
  try {
    return await instance.delete(url);
  } catch (error) {
    console.error(`DELETE 요청 에러: ${error.message}`);
    throw error;
  }
}

function validateArticle(article) {
  if (!article.title || !article.content) {
    throw new Error('잘못된 입력 값 입니다.');
  }
}

function validateArticleComment(comment) {
  if (!comment.content) {
    throw new Error('잘못된 입력 값 입니다.');
  }
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
  validateArticle(article);
  const res = await post('/articles', article);
  return res.data;
}

export async function patchArticle(id, article) {
  validateArticle(article);
  const res = await patch(`/articles/${id}`, article);
  return res.data;
}

export async function deleteArticle(id) {
  const res = await remove(`/articles/${id}`);
  return res.data;
}

export async function getArticleCommentList(articleId) {
  const res = await get(`/articles/${articleId}/comments`);
  return res.data;
}

export async function createArticleComment(articleId, comment) {
  validateArticleComment(comment);
  const res = await post(`/articles/${articleId}/comments`, comment);
  return res.data;
}

export async function patchArticleComment(articleId, id, comment) {
  validateArticleComment(comment);
  const res = await patch(`/articles/${articleId}/comments/${id}`, comment);
  return res.data;
}

export async function deleteArticleComment(articleId, id) {
  const res = await remove(`/articles/${articleId}/comments/${id}`);
  return res.data;
}

const articles = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
  getArticleCommentList,
  createArticleComment,
  patchArticleComment,
  deleteArticleComment
};

export default articles;
