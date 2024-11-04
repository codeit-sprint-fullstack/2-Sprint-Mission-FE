import { get, post, patch, remove } from './axios';

// 유효성 검증
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

// 자유게시판 API
export async function getArticleList({ page = 1, pageSize = 10 }) {
  const res = await get('/articles', {
    page,
    pageSize,
    orderBy: 'recent',
    keyword: ''
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

export async function createArticle(article) {
  validateArticle(article);
  const res = await post('/articles', article, true);
  return res.data;
}

export async function patchArticle(articleId, article) {
  validateArticle(article);
  const res = await patch(`/articles/${articleId}`, article, true);
  return res.data;
}

export async function deleteArticle(articleId) {
  const res = await remove(`/articles/${articleId}`, true);
  return res.data;
}

// 자유게시판 댓글 API
export async function getArticleCommentList(articleId) {
  const res = await get(`/articles/${articleId}/comments`, { limit: 10 });
  return res.data;
}

export async function createArticleComment(articleId, comment) {
  validateArticleComment(comment);
  const res = await post(`/articles/${articleId}/comments`, comment, true);
  return res.data;
}

export async function patchArticleComment(articleId, id, comment) {
  validateArticleComment(comment);
  const res = await patch(
    `/articles/${articleId}/comments/${id}`,
    comment,
    true
  );
  return res.data;
}

export async function deleteArticleComment(articleId, id) {
  const res = await remove(`/articles/${articleId}/comments/${id}`, true);
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
