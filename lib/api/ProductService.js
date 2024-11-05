
import instance from './apiService';

// Product 목록 가져오기
export async function getProductList({ page = 1, pageSize = 10, orderBy = 'recent', keyword = '' }) {
  try {
    const params = { page, pageSize, orderBy, keyword };
    const res = await instance.get('/products', { params } );
    //console.log('params', params);
    //return Array.isArray(res.list) ? res.list : [];
    return res;
  } catch (error) {
    console.error('상품 목록을 가져오는데 실패했습니다:', error);
    throw error;
  }
}

// 특정 Product 가져오기
export async function getProduct(id) {
  try {
    const res = await instance.get(`/products/${id}`);
    return res;
  } catch (error) {
    console.error('상품을 가져오는데 실패했습니다:', error);
    throw error;
  }
}

// 새로운 Product 생성
export async function createProduct(productData) {
  console.log('productData', productData);
  if (!productData.name.trim() || productData.name.length > 10) {
    throw new Error('상품명은 필수이며, 10자 이내로 입력해 주세요.');
  }
  if (!productData.price) {
    throw new Error('가격은 필수 항목입니다.');
  }
  try {
    const res = await instance.post('/products', productData);
    return res;
  } catch (error) {
    console.error('상품 생성에 실패했습니다:', error);
    throw error;
  }
}

// 기존 Product 수정
export async function updateProduct(id, data) {
  try {
    console.log('data', data);
    const res = await instance.patch(`/products/${id}`, data);
    return res;
  } catch (error) {
    console.error('상품 수정에 실패했습니다:', error);
    throw error;
  }
}

// Product 삭제
export async function deleteProduct(id) {
  try {
    const res = await instance.delete(`/products/${id}`);
    return res;
  } catch (error) {
    console.error('상품 삭제에 실패했습니다:', error);
    throw error;
  }
}

// 상품 댓글 목록 조회
export const getProductComments = async (productId, limit, cursor = null) => {
  try {
    const params = { limit };
    if (cursor) params.cursor = cursor;

    const res = await instance.get(`/products/${productId}/comments`, { params });
    return res;
  } catch (error) {
    console.error('댓글 목록을 가져오는 데 실패했습니다:', error);
    throw error;
  }
};

// 상품 댓글 생성
export const createProductComment = async (productId, data) => {
  try {
    const res = await instance.post(`/products/${productId}/comments`, data);
    return res; 
  } catch (error) {
    console.error('댓글 등록에 실패했습니다:', error);
    throw error;
  }
};

// 상품 댓글 삭제
export const deleteProductComment = async (commentId) => {
  try {
    const res = await instance.delete(`/comments/${commentId}`);
    return res; 
  } catch (error) {
    console.error('댓글 삭제에 실패했습니다:', error);
    throw error;
  }
};

// 상품 댓글 수정
export const updateProductComment = async (commentId, data) => {
  try {
    const res = await instance.patch(`/comments/${commentId}`, data);
    return res;
  } catch (error) {
    console.error('댓글 수정에 실패했습니다:', error);
    throw error;
  }
};
