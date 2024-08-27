import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/products',
  timeout: 5000
});

function isOK(res) {
  return res.status >= 200 && res.status < 300;
}

function returnIfOK(res) {
  if (!isOK(res)) throw new Error(res.status + ' ' + res.statusText);

  return res.data;
}

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

async function getProductList(params = {}) {
  const res = await requestGet('/', { params });

  return returnIfOK(res);
}

async function getProduct(id) {
  const res = await requestGet('/' + id);

  return returnIfOK(res);
}

async function createProduct(product) {
  const res = await requestPost('/', product);

  return returnIfOK(res);
}

async function patchProduct(id, product) {
  const res = await requestPatch('/' + id, product);

  return returnIfOK(res);
}

async function deleteProduct(id) {
  const res = await requestDelete('/' + id);

  return res.status;
}

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};