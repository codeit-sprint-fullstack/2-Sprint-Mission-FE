import axios from 'axios';

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app",
  timeout: 3000
})

export async function requestGet(url, params = {}) {
  try {
    return await instance.get(url, { params });
  }
  catch (error) {
    console.error('get error:', e.message);
  }
}

export async function requestPost(url, data) {
  try {
    return await instance.post(url, data);
  }
  catch (error) {
    console.error('post error: ', e.message);
  }
}

export async function requestPatch(url, data) {
  try {
    return await instance.patch(url, data);
  }
  catch (error) {
    console.error('patch error: ', e.message);
  }
}

export async function requestDelete(url) {
  try {
    return await instance.delete(url);
  }
  catch (error) {
    console.error('delete error:', e.message);
  }
}