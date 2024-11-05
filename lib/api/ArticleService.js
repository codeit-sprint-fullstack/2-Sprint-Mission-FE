import axios from 'axios';
// 게시글 관련 자체 개발 API 백엔드와 코드잇 제공 API 백엔드가 달라 임시로 자체 API 백엔드로 연결함
// 추후, sprint10에서 통합 예정
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ARTICLE_API_BASE_URL,
});

instance.interceptors.response.use(
  (res) => res.data, 
  (error) => {
    let errorMessage = '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    if (error.response) {
      console.error('API 응답 에러:', error.response.data.message || error.response.statusText);
      errorMessage = error.response.data.message || error.response.statusText || '서버에서 오류가 발생했습니다.';
    } else if (error.request) {
      console.error('API 요청 실패:', error.request);
      errorMessage = '서버와 연결할 수 없습니다. 네트워크를 확인해주세요.';
    } else {
      console.error('API 요청 중 에러 발생:', error.message);
      errorMessage = error.message || '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    }
    error.message = errorMessage;
    return Promise.reject(error);
  }
);

//import instance from './apiService';

// 게시글 목록 가져오기
export const getArticleList = async ({ page, pageSize, orderBy = 'recent' }) => {
  try {
    const res = await instance.get('/articles', {
      params: { page, pageSize, orderBy },
    });
    //console.log('Response data:', res);
    return Array.isArray(res.list) ? res.list : [];
  } catch (error) {
    console.error('게시글 목록을 가져오는데 실패했습니다:', error);
    throw error;
  }
};

// 게시글 생성
export const createArticle = async (data) => {
  try {
    const res = await instance.post('/articles', data);
    return res;  
  } catch (error) {
    console.error('게시글 생성에 실패했습니다:', error);
    throw error;
  }
};

// 특정 게시글 상세 정보 가져오기
export const getArticleById = async (id) => {
  try {
    const res = await instance.get(`/articles/${id}`);
    return res; 
  } catch (error) {
    console.error('게시글을 가져오는데 실패했습니다:', error);
    throw error;
  }
};

// 게시글 삭제
export const deleteArticle = async (id) => {
  try {
    await instance.delete(`/articles/${id}`);
  } catch (error) {
    console.error('게시글 삭제에 실패했습니다:', error);
    throw error;
  }
};

// 게시글 수정
export const updateArticle = async (id, data) => {
  try {
    const res = await instance.patch(`/articles/${id}`, data);
    return res; 
  } catch (error) {
    console.error('게시글 수정에 실패했습니다:', error);
    throw error;
  }
};

// 댓글 생성
export const createArticleComment = async (articleId, data) => {
  try {
    const res = await instance.post(`/articles/${articleId}/comments`, data);
    return res; 
  } catch (error) {
    console.error('댓글 등록에 실패했습니다:', error);
    throw error;
  }
};

// 댓글 삭제
export const deleteArticleComment = async (commentId) => {
  try {
    const res = await instance.delete(`/articles/comments/${commentId}`);
    return res; 
  } catch (error) {
    console.error('댓글 삭제에 실패했습니다:', error);
    throw error;
  }
};

// 댓글 수정
export const updateArticleComment = async (commentId, data) => {
  try {
    const res = await instance.patch(`/articles/comments/${commentId}`, data);
    return res;
  } catch (error) {
    console.error('댓글 수정에 실패했습니다:', error);
    throw error;
  }
};