import axios from "axios";

const BASE_URL = `https://panda-market-api.vercel.app`;
const accessToken = localStorage.getItem("accessToken");
export async function getItemList({
  sort = "recent",
  limit = 10,
  page = 1,
} = {}) {
  const query = `sort=${sort}&page=${page}&limit=${limit}`;
  const res = await axios.get(`${BASE_URL}/products?${query}`);
  return res.data;
}

export async function createItemList(formData) {
  const res = await axios.post(`${BASE_URL}/products`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken} `,
    },
  });
  return res.data;
}

export async function updateProductItem(id, formData) {
  const res = await axios.patch(`${BASE_URL}/products/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken} `,
    },
  });
  return res.data;
}
