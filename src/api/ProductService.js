// src/api/ProductService.js
//const PRODUCT_API_BASE_URL = 'https://panda-market-api.vercel.app/products';
const PRODUCT_API_BASE_URL = 'https://pandamarket-api.onrender.com/products';

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
  if (!productData.name.trim() || productData.name.length > 10) {
    throw new Error('상품명은 필수이며, 10자 이내로 입력해 주세요.');
  }
  if (!productData.price) {
    throw new Error('가격은 필수 항목입니다.');
  }
  try {
    const response = await fetch(PRODUCT_API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errorMessage', errorMessage);
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;    // 호출함수에서도 오류 메시지를 처리할 수 있게 오류를 다시 던진다.
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
