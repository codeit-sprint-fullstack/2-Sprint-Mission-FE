import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app',
  timeout: 3000
});

export async function getProductList(page, pageSize, keyword = '') {
  const products = await instance.get('/products', {
    params: { page, pageSize, keyword }
  });

  return products.data;
}

export async function getProduct(id) {
  const products = await instance.get(`/products/${id}`);
  return products.data;
}

export async function createProduct(productData) {
  const products = await instance.post('/products', productData)
  return products.data;
}

export async function patchProduct(id, productData) {
  const products = await instance.patch(`/products/${id}`, productData)
  return products.data;
}

export async function deleteProduct(id) {
  const products = await instance.delete(`/products/${id}`)
  return products.data;
}

let product = await deleteProduct(201);
console.log(product);
