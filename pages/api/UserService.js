import { requestGet, requestPatch } from "./api.js";

export async function getUser() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    // console.log("Access Token:", accessToken);
    if (!accessToken) {
      console.error("Access Token is missing");
      return;
    }
    const response = await requestGet(`/users/me`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function patchUser(data) {
  try {
    const response = await requestPatch(`/users/me`, data);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function patchPassword(data) {
  try {
    const response = await requestPatch(`/users/me/password`, data);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function getUserProducts() {
  try {
    const response = await requestGet(`/users/me/products`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function getUserFavorites() {
  try {
    const response = await requestGet(`/users/me/favorites`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}
