import { get, patch } from './axios';

export async function getUser() {
  const res = await get('/users/me');
  return res.data;
}

export async function patchUserImage({ image }) {
  const res = await patch('/users/me', { image });
  return res.data;
}

export async function patchUserPassword({
  passwordConfirmation,
  password,
  currentPassword
}) {
  const res = await patch('/users/me', {
    passwordConfirmation,
    password,
    currentPassword
  });
  return res.data;
}

export async function getUserProducts() {
  const res = await get('/users/me/products', {
    page: 1,
    pageSize: 10,
    keyword: ''
  });
  return res.data;
}

export async function getUserFavorites() {
  const res = await get('/users/me/favorites', {
    page: 1,
    pageSize: 10,
    keyword: ''
  });
}

const users = {
  getUser,
  patchUserImage,
  patchUserPassword,
  getUserProducts,
  getUserFavorites
};

export default users;
