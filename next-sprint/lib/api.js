import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

const axiosInstance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export async function login({ email, password }) {
  try {
    const res = await axiosInstance.post('/auth/signin', { email, password });
    return res.data;
  } catch (error) {
    throw error;
  }
}
