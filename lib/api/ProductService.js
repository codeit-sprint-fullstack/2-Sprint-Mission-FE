import axios from 'axios';

const PRODUCT_API_BASE_URL = 'https://panda-market-api.vercel.app/products';

// axios 인스턴스 생성 (옵션)
const instance = axios.create({
  baseURL: PRODUCT_API_BASE_URL,
  //baseURL: process.env.PRODUCT_API_BASE_URL,
});

instance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    let errorMessage = '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    if (error.response) {
      console.error('API 응답 에러:', error.response.data.message || error.response.statusText);
      errorMessage = error.response.data.message || error.response.statusText || '서버에서 오류가 발생했습니다.';
    } else if (error.request) {
      console.error('API 요청 실패:', error.request);
      errorMessage = '서버와 연결할 수 없습니다. 네트워크를 확인해주세요.';
    } else {
      console.error('API 요청 중 에러 발생:', error.message);
      errorMessage = error.message || '요청 중 문제가 발생했습니다. 다시 시도해주세요.';
    }
    error.message = errorMessage;
    return Promise.reject(error);
  }
);

// Product 목록 가져오기
export async function getProductList({ page = 1, pageSize = 10, orderBy = 'recent', keyword = '' }) {
  try {
    const params = { page, pageSize, orderBy, keyword };
    const res = await instance.get('', { params } );
    //console.log('params', params);
    //return Array.isArray(res.list) ? res.list : [];
    return res;
  } catch (error) {
    console.error('상품 목록을 가져오는데 실패했습니다:', error);
    throw error;
  }
}

// 특정 Product 가져오기
export async function getProduct(id) {
  try {
    const res = await instance.get(`/${id}`);
    return res;
  } catch (error) {
    console.error('상품을 가져오는데 실패했습니다:', error);
    throw error;
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
    const res = await instance.post('', productData);
    return res;
  } catch (error) {
    console.error('상품 생성에 실패했습니다:', error);
    throw error;
  }
}

// 기존 Product 수정
export async function patchProduct(id, data) {
  try {
    const res = await instance.patch(`/${id}`, data);
    return res;
  } catch (error) {
    console.error('상품 수정에 실패했습니다:', error);
    throw error;
  }
}

// Product 삭제
export async function deleteProduct(id) {
  try {
    const res = await instance.delete(`/${id}`);
    return res;
  } catch (error) {
    console.error('상품 삭제에 실패했습니다:', error);
    throw error;
  }
}
