// src/api/ProductService.js
const PRODUCT_API_BASE_URL = 'https://panda-market-api.vercel.app/products/';

// Product 목록 가져오기
export async function getProductList(
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = ''
) {
  try {
    const params = new URLSearchParams({
      page,
      pageSize,
      orderBy,
      keyword,
    });
    const response = await fetch(
      `${PRODUCT_API_BASE_URL}?${params.toString()}`
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errorMessage', errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

// 특정 Product 가져오기
export async function getProduct(id) {
  try {
    const response = await fetch(`${PRODUCT_API_BASE_URL}/${id}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errorMessage', errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

// 새로운 Product 생성
export async function createProduct(productData) {
  try {
    const response = await fetch(PRODUCT_API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errorMessage', errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

// 기존 Product 수정
export async function patchProduct(id, data) {
  try {
    const response = await fetch(`${PRODUCT_API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errorMessage', errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

// Product 삭제
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${PRODUCT_API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errorMessage', errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(error.message);
  }
}
