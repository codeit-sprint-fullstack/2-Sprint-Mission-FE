//async/await 을 이용하여 비동기 처리
//try/catch 를 이용하여 오류 처리

//import axios
import axios from 'axios';

//axios instance
const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/products',
});

//getProductList() : GET
export async function getProductList(params = {}) {
  const { page = 1, pageSize = 100, keyword = '' } = params;
  try {
    const res = await instance.get(
      '/', {
        params: {
          page: page,
          pageSize: pageSize,
          keyword: keyword,
        }
      });
    if (res.status < 200 || res.status >= 300) {
      throw new Error('에러가 발생했습니다.');
    }
    return res.data;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

//getProduct() : GET
export async function getProduct(id) {
  try {
    const res = await instance.get(`/${id}`);
    return res.data;
  } catch(e) {
    console.log(`message: 존재하지 않습니다.`);
  }
}

//createProduct() : POST 
export async function createProduct(name, description, price, tags, images) {
  try {
    const res = await instance.post('/', {
      'name': name,
      'description': description, 
      'price': price, 
      'tags': tags, 
      'images': images,
    });
    return res.data;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

//patchProduct() : PATCH 
export async function patchProduct(id, name, description, price, tags, images) {
  try {
    const res = await instance.patch(`/${id}`, {
      'name': name,
      'description': description, 
      'price': price, 
      'tags': tags, 
      'images': images,
    });
    return res.data;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

//deleteProduct() : DELETE
export async function deleteProduct(id) {
  try {
    const res = await instance.delete(`/${id}`);
    return res.data;
  } catch (e) {
    console.log('message: 존재하지 않습니다.');
  }
}
