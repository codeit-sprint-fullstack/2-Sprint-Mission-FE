const BASE_URL = "https://codeit-sprint6-api.onrender.com";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "createdAt",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const res = await fetch(`${BASE_URL}/products?${query}`);
  if (!res.ok) {
    throw new Error("Failed to get products list!");
  }
  const body = await res.json();
  return body;
}
