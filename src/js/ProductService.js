import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/products',
  timeout: 5000
});

function isOK(res) {
  return res.status >= 200 && res.status < 300;
}

async function getProductList(params = {}) {
  const res = await instance.get('/', { params });

  if (!isOK(res)) throw new Error(res.status + ' ' + res.statusText);

  return res.data;
}

async function getProduct(id) {
  const res = await instance.get('/' + id);

  if (!isOK(res)) throw new Error(res.status + ' ' + res.statusText);

  return res.data;
}

async function createProduct(product) {
  const res = await instance.post('/', product);

  if (!isOK(res)) throw new Error(res.status + ' ' + res.statusText);

  return res.data;
}

async function patchProduct(id, product) {
  const res = await instance.patch('/' + id, product);

  if (!isOK(res)) throw new Error(res.status + ' ' + res.statusText);

  return res.data;
}

async function deleteProduct(id) {
  const res = await instance.delete('/' + id);

  return res.status;
}

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};
