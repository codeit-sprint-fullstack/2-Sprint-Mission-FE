import axios from './axiosInstance';

export async function likeProduct(productId) {
  return await axios.post(`/likes/${productId}`);
}

export async function unlikeProduct(productId) {
  return await axios.delete(`/likes/${productId}`);
}