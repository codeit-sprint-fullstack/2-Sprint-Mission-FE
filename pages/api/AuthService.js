import { requestGet, requestPost, requestDelete } from "./api.js";

export async function getLogin(params = {}) {
  try {
    const response = await requestGet(`/auth/login`, params);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function getSignin(params = {}) {
  try {
    const response = await requestGet(`/auth/signin`, params);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function postLogin(data) {
  try {
    const response = await requestPost(`/auth/login`, data);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function postSignin(data) {
  try {
    const response = await requestPost(`/auth/signin`, data);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function deleteLogout() {
  try {
    const response = await requestDelete(`/auth/logout`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}
