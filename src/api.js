import axios from "axios";

const instance = axios.create({
  baseURL: "https://pandamarket-api-b1vd.onrender.com",
  timeout: 3000,
});

async function getProductList(params = {}) {
  return instance
    .get(`/items`, { params })
    .then((res) => res.data)
    .catch((error) => console.log("Request failed:", error.message));
}

async function getProduct(id) {
  return instance
    .get(`/items${id}`)
    .then((res) => res.data)
    .catch((error) => console.log("Request failed:", error.message));
}

async function createProduct(articleData) {
  return instance
    .post(`/items`, articleData)
    .then((res) => res.data)
    .catch((error) => console.log("Request failed:", error.message));
}

async function patchProduct(id, articleData) {
  return instance
    .patch(`/items${id}`, articleData)
    .then((res) => res.data)
    .catch((error) => console.log("Request failed:", error.message));
}

async function deleteProduct(id) {
  return instance
    .delete(`/items${id}`)
    .then((res) => `${res.status} ${res.statusText} ${res.message}`)
    .catch((error) => console.log("Request failed:", error.message));
}

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
