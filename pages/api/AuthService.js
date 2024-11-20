import { requestPost } from "./api.js";

export async function postSignIn(data) {
  try {
    const response = await requestPost(`/auth/signIn`, data);
    // console.log('Response Data: ', response.data);
    return response.data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
}

export async function postSignUp(data) {
  try {
    const response = await requestPost(`/auth/signUp`, data);
    return response.data;
  } catch (e) {
    console.error('error response:', e.response?.data);
    throw e;
  }
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      const response = await requestPost(`/auth/refresh-token`, {}, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        }
      });
      return response.data;
    } catch (e) {
      console.error(e.message);
    }
  } else {
    console.error('No refresh token stored');
  }
}