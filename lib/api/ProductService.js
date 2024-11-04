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
  const res = await post('/proucts', product);
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

const products = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
  getProductCommentList,
  createProductComment
};

export default products;