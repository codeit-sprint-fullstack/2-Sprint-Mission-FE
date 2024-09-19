import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/",
});

export async function getProductList(page, pageSize, keyword) {
  try {
    const res = await instance.get("/products", {
      params: { page, pageSize, keyword },
    });

    if (res.status >= 200 && res.status < 300) return res.data;
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function getProduct(id) {
  try {
    const res = await instance.get(`/products/${id}`);

    if (res.status >= 200 && res.status < 300) return res.data;
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function createProduct({ name, description, price, manufacturer, tags, images }) {
  try {
    const res = await instance.post("/products", {
      name: name,
      description: description,
      price: price,
      manufacturer: manufacturer,
      tags: tags,
      images: images,
    });

    if (res.status >= 200 && res.status < 300) return res.data;
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function patchProduct(id, { name, description, price, manufacturer, tags, images }) {
  try {
    const res = await instance.patch(`/products/${id}`, {
      name: name,
      description: description,
      price: price,
      manufacturer: manufacturer,
      tags: tags,
      images: images,
    });

    if (res.status >= 200 && res.status < 300) return res.data;
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const res = await instance.delete(`product/${id}`);

    if (res.status >= 200 && res.status < 300) return res.data;
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
