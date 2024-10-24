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

export async function getArticleCommentList(
  articleId,
  { page, order, keyword }
) {
  const res = await get(`/articles/${articleId}/comments`, {
    params: { page, order, keyword }
  });
  return res.data;
}

export async function createArticleComment(articleId, comment) {
  const res = await post(`/articles/${articleId}/comments`, comment);
  return res.data;
}

export async function patchArticleComment(articleId, id, comment) {
  const res = await patch(`/articles/${articleId}/comments/${id}`, comment);
  return res.data;
}

export async function deleteArticleComment(articleId, id) {
  const res = await remove(`/articles/${articleId}/comments/${id}`);
  return res.data;
}

const articleComments = {
  getArticleCommentList,
  createArticleComment,
  patchArticleComment,
  deleteArticleComment
};

export default articleComments;
