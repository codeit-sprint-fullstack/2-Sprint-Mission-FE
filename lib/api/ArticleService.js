import { get, post, patch, remove } from './axios';

// 자유게시판 API
export async function getArticleList({ page, pageSize, orderBy, keyword }) {
  const res = await get('/articles', {
    page,
    pageSize,
    orderBy,
    keyword
  });

  if (!Array.isArray(res.data.list)) {
    throw new Error('응답 데이터 형식이 올바르지 않습니다.');
  }
  return res.data.list;
}

export async function getArticleCount() {
  const res = await get('/articles');
  return res.data.totalCount;
}

export async function getArticle(articleId) {
  const res = await get(`/articles/${articleId}`);
  return res.data;
}

export async function createArticle(articleData) {
  const res = await post('/articles', articleData);
  return res.data;
}

export async function patchArticle(articleId, articleData) {
  const res = await patch(`/articles/${articleId}`, articleData);
  return res.data;
}

export async function deleteArticle(articleId) {
  const res = await remove(`/articles/${articleId}`);
  return res.data;
}

// 자유게시판 댓글 API
export async function getArticleCommentList(articleId) {
  const res = await get(`/articles/${articleId}/comments`, { limit: 10 });
  return res.data;
}

export async function createArticleComment(articleId, comment) {
  const res = await post(`/articles/${articleId}/comments`, comment);
  return res.data;
}

export async function patchArticleComment(commentId, comment) {
  const res = await patch(`/comments/${commentId}`, comment);
  return res.data;
}

export async function deleteArticleComment(commentId) {
  const res = await remove(`/comments/${commentId}`);
  return res.data;
}

const articles = {
  getArticleList,
  getArticleCount,
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
