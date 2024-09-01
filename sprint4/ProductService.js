import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/",
});

export function getProductList(page, pageSize, keyword) {
  return instance
    .get("/products", {
      params: { page, pageSize, keyword },
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}

export function getProduct(id) {
  return instance
    .get(`/products/${id}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}

export function createProduct({ name, description, price, manufacturer, tags, images }) {
  return instance
    .post("/products", {
      name,
      description,
      price,
      manufacturer,
      tags,
      images,
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}

export function patchProduct(id, { name, description, price, manufacturer, tags, images }) {
  return instance
    .patch(`/products/${id}`, {
      name,
      description,
      price,
      manufacturer,
      tags,
      images,
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}

export function deleteProduct(id) {
  return instance
    .delete(`/products/${id}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) return res.data;
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
}
