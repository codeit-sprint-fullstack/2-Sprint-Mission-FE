import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app',
  timeout: 3000
});

export async function getProductList(page, pageSize, keyword = '') {
  try {
    const products = await instance.get('/products', {
    params: { page, pageSize, keyword }
  });
    return products.data;
  } catch(e) {
    console.log(e.message);
  }
} 

export async function getProduct(id) {
  try {
    const products = await instance.get(`/products/${id}`);
    return products.data;
  } catch(e) {
    console.log(e.message);
  }
}

export async function createProduct(productData) {
  try {
    const products = await instance.post('/products', productData)
    return products.data;
  } catch(e) {
    console.log(e.message);
  }
}

export async function patchProduct(id, productData) {
  try {
    const products = await instance.patch(`/products/${id}`, productData)
    return products.data;
  } catch(e) {
    console.log(e.message);
  }
}

export async function deleteProduct(id) {
  try {
    const products = await instance.delete(`/products/${id}`)
    return `${id}번 글이 정상적으로 삭제되었습니다.`;
  } catch(e) {
    console.log(e.message);
  }
}
