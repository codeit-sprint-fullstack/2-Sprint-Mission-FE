import { get, post, patch, remove } from './axios';
import { QueryParams, ArticleData, Comment } from '@/types/type';

// 자유게시판 API
export async function getArticleList({
  page,
  pageSize,
  orderBy,
  keyword
}: QueryParams) {
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

export async function getArticle(articleId: number) {
  const res = await get(`/articles/${articleId}`);
  return res.data;
}

export async function createArticle(articleData: ArticleData) {
  const res = await post('/articles', articleData);
  return res.data;
}

export async function patchArticle(
  articleId: number,
  articleData: ArticleData
) {
  const res = await patch(`/articles/${articleId}`, articleData);
  return res.data;
}

export async function deleteArticle(articleId: number) {
  const res = await remove(`/articles/${articleId}`);
  return res.data;
}

// 자유게시판 댓글 API
export async function getArticleCommentList(articleId: number) {
  const res = await get(`/articles/${articleId}/comments`, { limit: 10 });
  return res.data;
}

export async function createArticleComment(
  articleId: number,
  comment: Comment
) {
  const res = await post(`/articles/${articleId}/comments`, comment);
  return res.data;
}

export async function patchArticleComment(commentId: number, comment: Comment) {
  const res = await patch(`/comments/${commentId}`, comment);
  return res.data;
}

export async function deleteArticleComment(commentId: number) {
  const res = await remove(`/comments/${commentId}`);
  return res.data;
}

// 자유게시판 좋아요 API
export async function createArticleLike(articleId: number) {
  const res = await post(`/articles/${articleId}/like`);
  return res.data;
}

export async function deleteArticleLike(articleId: number) {
  const res = await remove(`/articles/${articleId}/like`);
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
  deleteArticleComment,
  createArticleLike,
  deleteArticleLike
};

export default articles;
