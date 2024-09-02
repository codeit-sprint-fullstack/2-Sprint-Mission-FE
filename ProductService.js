import { requestGet, requestPost, requestPatch, requestDelete } from './api.mjs';

export async function getProductList(params = {}) {
  try {
    const response = await requestGet('/product', params);
    return response.data;
  }
  catch (error) {
    console.log(e.message);
  }
}

export async function getProduct(id) {
  const response = await requestGet(`/products/${id}`);
  return response.data;
}

export async function createProduct(productData) {
  const response = await requestPost('/products', productData);
  return response.data;
}

export async function patchProduct(id, productData) {
  const response = await requestPatch(`/products/${id}`, productData);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await requestDelete(`/products/${id}`);
  return response.data;
}