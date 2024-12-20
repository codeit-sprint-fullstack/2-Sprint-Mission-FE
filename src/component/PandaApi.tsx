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


// favoriteCount로 고정된 리스트 불러오기
export async function getList({ pageSize = 4 }) {
  const query = `orderBy=favorite&pageSize=${pageSize}`; // favoriteCount 고정
  const res = await axios.get(`${BASE_URL}/products?${query}`);
  return res.data; // axios의 응답 데이터는 res.data에 포함되어 있음
}

// order에 따라 리스트 불러오기
export async function getListItem({ order = "recent", pageSize = 10, page = 1 }) {
  const query = `orderBy=${order}&page=${page}&pageSize=${pageSize}`; // order와 pageSize를 쿼리 파라미터로 포함
  const res = await axios.get(`${BASE_URL}/products?${query}`);
  return res.data; // axios의 응답 데이터는 res.data에 포함되어 있음
}
