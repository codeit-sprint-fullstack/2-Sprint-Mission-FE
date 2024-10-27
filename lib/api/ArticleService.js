import axios from 'axios';

const instance = axios.create({
  //baseURL: 'http://localhost:3000',
  baseURL: 'https://buffso-pandamarket-api.onrender.com',
});

// 인터셉터를 사용한 공통 에러 처리
instance.interceptors.response.use(
  (res) => res.data,                      // 성공 응답 시 데이터만 반환
  (error) => {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data.message || error.response.statusText);
      throw new Error(error.response.data.message || '서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('API 요청 실패:', error.request);
      throw new Error('서버와 연결할 수 없습니다. 네트워크를 확인해주세요.');
    } else {
      console.error('요청 중 에러 발생:', error.message);
      throw new Error('요청 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  }
);

// 게시글 목록 가져오기
export const getArticleList = async ({ page, pageSize, orderBy = 'recent' }) => {
  try {
    const res = await instance.get('/articles', {
      params: { page, pageSize, orderBy },
    });
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
    return res.data; 
  } catch (error) {
    console.error('댓글 삭제에 실패했습니다:', error);
    throw error;
  }
};

// 댓글 수정
export const updateArticleComment = async (commentId, data) => {
  try {
    const response = await instance.patch(`/articles/comments/${commentId}`, data);
    return response.data;
  } catch (error) {
    console.error('댓글 수정에 실패했습니다:', error);
    throw error;
  }
};