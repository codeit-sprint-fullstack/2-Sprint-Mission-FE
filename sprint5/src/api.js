import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app'
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('주의 : 에러 발생!');
    throw err;
  }
);

async function requestGet(url, params) {
  try {
    return instance.get(url, params);
  } catch (err) {
    console.error(err.message);
  }
}

async function requestPost(url, body) {
  return instance.post(url, body);
}

async function requestPatch(url, body) {
  return instance.patch(url, body);
}

async function requestDelete(url) {
  return instance.delete(url);
}

export async function getProductList(params = {}) {
  try {
    const res = await requestGet(`/products`, params);
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getProduct(id) {
  const res = await requestGet(`/products${id}`);
  return res.data;
}

export async function createProduct(product) {
  const res = await requestPost(`/products`, product);
  return res.data;
}

export async function patchProduct(id, product) {
  const res = await requestPatch(`/products${id}`, product);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await requestDelete(`/products${id}`);
  return res.data;
}

const products = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};

export default products;
