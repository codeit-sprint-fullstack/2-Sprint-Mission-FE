import { get, post, patch, remove } from './axios';

// 상품 목록 API
export async function getProductList({ page, pageSize, orderBy, keyword }) {
  const res = await get('/products', {
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

export async function getProductCount() {
  const res = await get('/products');
  return res.data.totalCount;
}

export async function getProduct(productId) {
  const res = await get(`/products/${productId}`);
  return res.data;
}

export async function createProduct(product) {
  const res = await post('/products', product);
  console.log(res.data);
  return res.data;
}

export async function patchProduct(productId, product) {
  const res = await patch(`/products/${productId}`, product);
  return res.data;
}

export async function deleteProduct(productId) {
  const res = await remove(`/products/${productId}`);
  return res.data;
}

// 상품 상세 댓글 API
export async function getProductCommentList(productId) {
  const res = await get(`/products/${productId}/comments`, { limit: 10 });
  return res.data;
}

export async function createProductComment(productId, comment) {
  const res = await post(`/products/${productId}/comments`, comment);
  return res.data;
}

export async function patchProductComment(commentId, comment) {
  try {
    const res = await patch(`/comments/${commentId}`, comment);
    return res.data;
  } catch (error) {
    console.error(
      '댓글 수정 중 오류 발생:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function deleteProductComment(commentId) {
  const res = await remove(`/comments/${commentId}`);
  return res.data;
}

export async function createProductFavorite(productId) {
  const res = await post(`/products/${productId}/favorite`);
  return res.data;
}

export async function deleteProductFavorite(productId) {
  const res = await remove(`/products/${productId}/favorite`);
  return res.data;
}

const products = {
  getProductList,
  getProductCount,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
  getProductCommentList,
  createProductComment,
  patchProductComment,
  deleteProductComment,
  createProductFavorite,
  deleteProductFavorite
};

export default products;
