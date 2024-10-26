import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
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
  const res = await instance.get('/articles', {
    params: {
      page,
      pageSize,
      orderBy,
    },
  });
  
  return Array.isArray(res.list) ? res.list : [];
};

// 게시글 생성
export const createArticle = async (data) => {
  const res = await instance.post('/articles', data);
  return res;  // 인터셉터가 데이터만 반환하므로 res 그대로 반환
};
