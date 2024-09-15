import axios from "axios";
const instance = axios.create({
  baseURL: "https://pandamarket-zyyr.onrender.com/products"
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

export async function getProducts({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent"
} = {}) {
  if (!validatePositiveInteger(page)) {
    throw new Error("page는 양의 정수여야 합니다.");
  }
  if (!validatePositiveInteger(pageSize)) {
    throw new Error("pageSize는 양의 정수여야 합니다.");
  }
  if (orderBy === "recent") {
    const res = await instance.get("", {
      params: { page, pageSize, keyword, orderBy: "recent" }
    });
    const data = res.data;
    return data;
  } else {
    const res = await instance.get("", {
      params: { page, pageSize, keyword, orderBy: "favorite" }
    });
    const data = res.data;
    return data;
  }
}
export default getProducts;
