import { get, post, patch, remove } from './axios';

// 상품 목록 API
export async function getProductList() {
  const res = await get('/products', {
    page: 1,
    pageSize: 10,
    orderBy: 'recent',
    keyword: ''
  });
  return res.data;
}

export async function getProduct(productId) {
  const res = await get(`/products/${productId}`);
  return res.data;
}

export async function createProduct(product) {
  const res = await post('/products', product, true);
  console.log(res.data);
  return res.data;
}

export async function patchProduct(productId, product) {
  const res = await patch(`/products/${productId}`, product, true);
  return res.data;
}

export async function deleteProduct(productId) {
  const res = await remove(`/products/${productId}`, true);
  return res.data;
}

// 상품 상세 댓글 API
export async function getProductCommentList(productId) {
  const res = await get(`/products/${productId}/comments`, { limit: 10 });
  return res.data;
}

export async function createProductComment(productId, comment) {
  const res = await post(`/products/${productId}/comments`, comment, true);
  return res.data;
}

export async function patchProductComment(commentId, comment) {
  try {
    const res = await patch(`/comments/${commentId}`, comment, true);
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
  const res = await remove(`/comments/${commentId}`, true);
  return res.data;
}

const products = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
  getProductCommentList,
  createProductComment,
  patchProductComment,
  deleteProductComment
};

export default products;
