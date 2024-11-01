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
export async function getArticleList() {
  const allArticles = [];
  let currentPage = 1;
  const pageSize = 10;
  let hasMoreData = true;

  while (hasMoreData) {
    const res = await get('/articles', {
      page: currentPage,
      pageSize: pageSize,
      orderBy: 'recent',
      keyword: ''
    });

    if (!Array.isArray(res.data.list)) {
      throw new Error('응답 데이터 형식이 올바르지 않습니다.');
    }

    if (res.data.list.length === 0) {
      hasMoreData = false;
    } else {
      allArticles.push(...res.data.list);
      currentPage++;
    }
  }

  return allArticles;
}

export async function getArticle(articleId) {
  const res = await get(`/articles/${articleId}`);
  return res.data;
}

export async function createArticle(article) {
  validateArticle(article);
  const res = await post('/articles', article);
  return res.data;
}

export async function patchArticle(articleId, article) {
  validateArticle(article);
  const res = await patch(`/articles/${articleId}`, article);
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
