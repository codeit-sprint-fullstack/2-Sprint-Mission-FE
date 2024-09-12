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
  const errors = [];

  function ValidateData(key, type) {
    if (typeof productData[key] !== type) {
      const currentType = typeof productData[key];
      errors.push({
        path: key,
        message: `Expected a(an) ${type}, but received: ${currentType}`
      })
    }
  }

  ValidateData('name', 'string');
  ValidateData('description', 'string');
  ValidateData('price', 'number');
  ValidateData('tags', 'array');
  ValidateData('images', 'array');

  if (errors.length > 0) {
    return {
      message: '유효성 검사 오류입니다.',
      errors: errors
    }
  }

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
