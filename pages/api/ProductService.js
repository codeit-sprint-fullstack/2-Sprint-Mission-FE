import { requestGet, requestPost, requestPatch, requestDelete } from "./api.js";

export async function getProductList(params = {}) {
  try {
    const response = await requestGet(`/products`, params);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function getProduct(id) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    console.log("Access Token:", accessToken);
    const response = await requestGet(
      `/products/${id}`,
      {},
      {
        Authorization: `Bearer ${accessToken}`
      }
    );
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function createProduct(productData) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }
  
  try {
    const response = await requestPost(`/products`, productData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function patchProduct(id, productData) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    const response = await requestPatch(`/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function deleteProduct(id) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("Access Token is missing");
    return;
  }

  try {
    const response = await requestDelete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}
