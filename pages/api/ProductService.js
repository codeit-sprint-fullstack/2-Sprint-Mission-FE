import {
    requestGet,
    requestPost,
    requestPatch,
    requestDelete,
  } from "./api.js";
  
  export async function getProductList(params = {}) {
    try {
      const response = await requestGet(`/products`, params);
      return response.data;
    } catch(e) {
      console.error(e.message);
    }
  }
  
  export async function getProduct(id) {
    const response = await requestGet(`/products/${id}`);
    return response.data;
  }
  
  export async function createProduct(productData) {
    const response = await requestPost(`/products`, productData);
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
  