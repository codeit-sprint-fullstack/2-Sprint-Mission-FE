const BASE_URL = "https://codeit-sprint6-api.onrender.com";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "createdAt",
  search = "",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&search=${search}`;
  try {
    const res = await fetch(`${BASE_URL}/products?${query}`);

    if (!res.ok) {
      throw new Error("Failed to get products list!");
    }

    const body = await res.json();
    return body;
  } catch (e) {
    console.log(e.message);
  }
};

export async function createProduct(productData) {
  try {
    
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!res.ok) {
      throw new Error('데이터를 생성하지 못했습니다.');
    }

    const body = await res.json();
    return body;
  } catch (e) {
    console.log(e.message);
  } 
};
