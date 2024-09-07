import axios from "axios";
const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/products",
  // timeout: 5000,
});
function validatePositiveInteger(data) {
  if (Number.isInteger(data) && data > 0) {
    return true;
  } else {
    return false;
  }
}
function isValid(value) {
  return value === undefined || value === "" || value === null;
}

export async function test({
  page = 1,
  pageSize = 10,
  keyword = '',
  orderBy = "recent",
} = {}) {
  if (orderBy === 'recent') {
    const res = await instance.get('', { params: { page, pageSize, keyword, orderBy: 'recent' } });
    const data = res.data;
    return data;
  } else {
    const res = await instance.get('', { params: { page, pageSize, keyword, orderBy: 'favorite' } });
    const data = res.data;
    return data;
  }

}
export default test;