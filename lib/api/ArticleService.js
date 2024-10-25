import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const getArticleList = async ({ page, pageSize, orderBy = 'recent' }) => {
  try {
    const res = await instance.get('/articles', {
      params: {
        page,
        pageSize,
        orderBy,
      },
    });
    return res.data.list || [];
  } catch (error) {
    console.error('게시글을 가져오는데 실패했습니다:', error);
    throw error;
  }
};
