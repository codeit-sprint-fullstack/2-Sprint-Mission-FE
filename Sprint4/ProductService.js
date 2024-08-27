import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/products'
});

function requestGet(url, params) {
  return instance.get(url, params);
}

function requestPost(url, body) {
  return instance.post(url, body);
}

function requestPatch(url, body) {
  return instance.patch(url, body);
}

function requestDelete(url) {
  return instance.delete(url);
}

async function handleRequest(request) {
  try {
    const res = await request;
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  } catch (err) {
    return `${err} 에러 발생!`;
  }
}

export async function getProductList(page, pageSize, keyword) {
  return handleRequest(
    requestGet(`/`, { params: { page, pageSize, keyword } })
  );
}

export async function getProduct(id) {
  return handleRequest(requestGet(`/${id}`));
}

export async function createProduct(product) {
  return handleRequest(requestPost(`/`, product));
}

export async function patchProduct(id, product) {
  return handleRequest(requestPatch(`/${id}`, product));
}

export async function deleteProduct(id) {
  return handleRequest(requestDelete(`/${id}`));
}

const products = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};

export default products;
