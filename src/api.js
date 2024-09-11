const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "favorite",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const res = await fetch(`${BASE_URL}/products?${query}`);
  if (!res.ok) {
    throw new Error("Failed to get products list!");
  }
  const body = await res.json();
  return body;
}
