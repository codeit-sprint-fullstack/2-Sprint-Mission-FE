export async function getProducts() {
  const response = await fetch("https://panda-market-api.vercel.app/products");
  const data = await response.json();
  return data.list;
}
