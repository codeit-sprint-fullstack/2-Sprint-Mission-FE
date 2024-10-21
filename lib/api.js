import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://welcome-panda-market-api.onrender.com'
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('주의 : 에러 발생!');
    throw err;
  }
);

async function get(url, params = {}) {
  return instance.get(url, { params });
}

async function post(url, body) {
  return instance.post(url, body);
}

async function patch(url, body) {
  return instance.patch(url, body);
}

async function remove(url) {
  return instance.delete(url);
}

export async function getProductList({ page, pageSize, order, keyword }) {
  const res = await get(`/products`, {
    params: {
      page,
      pageSize,
      order,
      keyword
    }
  });
  return res.data;
}

export async function getProduct(id) {
  const res = await get(`/products/${id}`);
  return res.data;
}

export async function createProduct(product) {
  const res = await post(`/products`, product);
  return res.data;
}

export async function patchProduct(id, product) {
  const res = await patch(`/products/${id}`, product);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await remove(`/products/${id}`);
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
