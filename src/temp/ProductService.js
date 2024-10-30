import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/products',
  timeout: 5000,
});

instance.interceptors.response.use(
  res => res,
  err => {
    throw new Error(err.response.status + ' ' + err.response.statusText);
  },
);

function getRequest(url, params) {
  return instance.get(url, params);
}

function postRequest(url, body) {
  return instance.post(url, body);
}

function patchRequest(url, body) {
  return instance.patch(url, body);
}

function deleteRequest(url) {
  return instance.delete(url);
}

async function getProductList(params = {}) {
  const res = await getRequest('/', { params });

  // return returnIfOK(res);
  return res.data;
}

async function getProduct(id) {
  const res = await getRequest('/' + id);

  // return returnIfOK(res);
  return res.data;
}

async function createProduct(product) {
  const res = await postRequest('/', product);

  // return returnIfOK(res);
  return res.data;
}

async function patchProduct(id, product) {
  const res = await patchRequest('/' + id, product);

  // return returnIfOK(res);
  return res.data;
}

async function deleteProduct(id) {
  const res = await deleteRequest('/' + id);

  return res.status;
}

export { getProductList, getProduct, createProduct, patchProduct, deleteProduct };
