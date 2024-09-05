export async function getProduct({
  page = 1,
  pageSize = 10,
  order = 'createdAt',
  keyword = ''
}) {
  const query = `page=${page}&pageSize=${pageSize}&order=${order}&keyword=${keyword}`;
  const res = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await res.json();
  return data;
}
