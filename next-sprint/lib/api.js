import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

export const axiosInstance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  headers: { 'Content-Type': 'application/json' }
});

export async function login({ email, password }) {
  try {
    const res = await axiosInstance.post('/auth/signIn', { email, password });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signup({
  email,
  nickname,
  password,
  passwordConfirmation
}) {
  try {
    const res = await axiosInstance.post('/auth/signUp', {
      email,
      nickname,
      password,
      passwordConfirmation
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUser() {
  try {
    const res = await axiosInstance.get('/users/me');
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProduct(productId) {
  try {
    const res = await axiosInstance.get(`/products/${productId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const res = await axiosInstance.delete(`/products/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getComments(productId) {
  try {
    const res = await axiosInstance.get(`/products/${productId}/comments`, {
      params: {
        limit: 10
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function patchProductComments(commentId, comments) {
  try {
    const res = await axiosInstance.patch(`/comments/${commentId}`, comments);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductComments(commentId) {
  try {
    const res = await axiosInstance.delete(`/comments/${commentId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createProductFavorite(productId) {
  try {
    const res = await axiosInstance.post(`/products/${productId}/favorite`, {});
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductFavorite(productId) {
  try {
    const res = await axiosInstance.delete(`/products/${productId}/favorite`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
