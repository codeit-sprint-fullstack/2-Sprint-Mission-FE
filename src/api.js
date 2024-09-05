import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  timeout: 3000,
});

async function getProductList(params = {}) {
  return instance.get(`/products`, {params})
  .then((res) => res.data)
  .catch((error) =>  console.log('Request failed:', error.message));
}

async function getProduct(id) {
  return instance.get(`/products${id}`)
  .then((res) => res.data)
  .catch((error) =>  console.log('Request failed:', error.message));
}

async function createProduct(articleData) {
  return instance.post(`/products`, articleData)
  .then((res) => res.data)
  .catch((error) =>  console.log('Request failed:', error.message));
}

async function patchProduct(id, articleData) {
  return instance.patch(`/products${id}`, articleData)
  .then((res) => res.data)
  .catch((error) =>  console.log('Request failed:', error.message));
}

async function deleteProduct(id) {
  return instance.delete(`/products${id}`)
  .then((res) => `${res.status} ${res.statusText} ${res.message}`)
  .catch((error) =>  console.log('Request failed:', error.message));
}

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};