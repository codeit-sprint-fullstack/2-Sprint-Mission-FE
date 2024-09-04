import axios from "axios";
const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/products",
  timeout: 5000,
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
export async function getProductList(params) {
  //page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
  const { page = 1, pageSize = 10, keyword = "" } = params || {};
  if (!validatePositiveInteger(page)) {
    throw new Error("page는 양의 정수여야 합니다.");
  }
  if (!validatePositiveInteger(pageSize)) {
    throw new Error("pageSize는 양의 정수여야 합니다.");
  }
  const option = {
    page,
    pageSize,
    pageSize,
  };

  const res = await instance.get("", params);
  const data = res.data;
  return data;
}
export async function getProduct(id) {
  if (!validatePositiveInteger(id)) {
    throw new Error("id는 양의 정수여야 합니다.");
  }
  try {
    const res = await instance.get(`/${id}`);
    const data = res.data;
    return data;
  } catch {
    throw new Error("리퀘스트 실패");
  }
}
export async function createProduct(params) {
  if (!(typeof params.price === "number" && !isNaN(params.price))) {
    throw new Error("가격은 숫자여야 합니다.");
  }
  if (params.price <= 0) {
    throw new Error("가격은 0원 이하가 될 수 없습니다.");
  }
  const { name, description, price, tags, images } = params;
  const testParams = {
    name,
    description,
    price,
    tags,
    images,
  };
  for (let option in testParams) {
    if (isValid(testParams[option])) {
      throw new Error(`${option}은 필수 기입사항입니다.`);
    }
  }
  const res = await instance.post("", params);
  return res.data;
}
export async function patchProduct(id, params) {
  if (params.price) {
    if (!(typeof params.price === "number" && !isNaN(params.price))) {
      throw new Error("가격은 숫자여야 합니다.");
    }
    if (params.price <= 0) {
      throw new Error("가격은 0원 이하가 될 수 없습니다.");
    }
  }
  const res = await instance.patch(`/${id}`, params);
  return res.data;
}
export async function deleteProduct(id) {
  if (!validatePositiveInteger(id)) {
    throw new Error("id는 양의 정수여야 합니다.");
  }
  try {
    const res = await instance.delete(`/${id}`);
    const data = res.data;
  } catch {
    throw new Error("리퀘스트 실패");
  }
}
