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

export async function getProductList(page, pageSize, keyword) {
  try {
    const res = await requestGet('/', {
      params: {
        page,
        pageSize,
        keyword
      }
    });
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  } catch (err) {
    return `${err} 에러 발생!`;
  }
}

export async function getProduct(id) {
  try {
    const res = await requestGet(`/${id}`);
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  } catch (err) {
    return `${err} 에러 발생!`;
  }
}

export async function createProduct(product) {
  try {
    const res = await requestPost('/', product);
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  } catch (err) {
    return `${err} 에러 발생!`;
  }
}

export async function patchProduct(id, product) {
  try {
    const res = await requestPatch(`/${id}`, product);
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  } catch (err) {
    return `${err} 에러 발생!`;
  }
}

export async function deleteProduct(id) {
  try {
    const res = await requestDelete(`/${id}`);
    if (res.status >= 200 && res.status < 300) {
      return res.status;
    }
  } catch (err) {
    return `${err} 에러 발생!`;
  }
}

const products = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};

export default products;
