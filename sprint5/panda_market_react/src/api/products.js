export async function getProducts({ order = "recent", offset = 0, limit = 6 }) {
  const query = `order=${order}&offset=${offset}=${limit}`;
  const response = await fetch(
    ` https://panda-market-api.vercel.app/docs/?${query}`
  );
  if (!response.ok) {
    throw new Error("상품 목록을 불러오는데 실패했습니다.");
  }
  const data = await response.json();
  return data;
}
