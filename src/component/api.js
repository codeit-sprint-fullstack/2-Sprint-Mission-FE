const BASE_URL = `https://panda-market-api.vercel.app`;

// favoriteCount로 고정된 리스트 불러오기
export async function getList({ pageSize = 4 }) {
  const query = `orderBy=favorite&pageSize=${pageSize}`; // favoriteCount 고정
  const res = await fetch(`${BASE_URL}/products?${query}`);
  return await res.json();
}

// order에 따라 리스트 불러오기
export async function getListItem({ order = "recent", pageSize = 10,page=1 }) {
  const query = `orderBy=${order}&page=${page}&pageSize=${pageSize}`; // order와 pageSize를 쿼리 파라미터로 포함
  const res = await fetch(`${BASE_URL}/products?${query}`);
  return await res.json();
}
