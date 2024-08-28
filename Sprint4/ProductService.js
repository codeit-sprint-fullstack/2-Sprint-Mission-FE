import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/products'
});

instance.interceptors.response.use(
  (res) => res,
  (err) => console.log(`${err.response.status} 에러 발생!`)
);

async function requestGet(url, params) {
  return instance.get(url, params);
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

// async function handleRequest(request) {
//   try {
//     const res = await request;
//     if (res.status >= 200 && res.status < 300) {
//       return res.data;
//     }
//   } catch (err) {
//     return `${err} 에러 발생!`;
//   }
// }

export async function getProductList(page, pageSize, keyword) {
  const res = await requestGet(`/`, { params: { page, pageSize, keyword } });
  return res.data;
  // return handleRequest(requestGet(`/`, { params: { page, pageSize, keyword } }));
}

export async function getProduct(id) {
  const res = await requestGet(`/${id}`);
  return res.data;
  // return handleRequest(requestGet(`/${id}`));
}

export async function createProduct(product) {
  const res = await requestPost(`/`, product);
  return res.data;
  // return handleRequest(requestPost(`/`, product));
}

export async function patchProduct(id, product) {
  const res = await requestPatch(`/${id}`, product);
  return res.data;
  // return handleRequest(requestPatch(`/${id}`, product));
}

export async function deleteProduct(id) {
  const res = await requestDelete(`/${id}`);
  return res.data;
  // return handleRequest(requestDelete(`/${id}`));
}

const products = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};

export default products;
