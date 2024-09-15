import axios from "axios";

const instance = axios.create({
  baseURL: "https://products-lhsi.onrender.com/",
});

export function getProducts(page, pageSize, search, sort) {
  // 유효성 검사 추가
  if (typeof page !== "number" || page < 1) {
    throw new Error("Invalid page: must be a positive number.");
  }
  if (typeof pageSize !== "number" || pageSize < 1) {
    throw new Error("Invalid pageSize: must be a positive number.");
  }
  if (typeof search !== "string") {
    throw new Error("Invalid search: must be a string.");
  }
  if (typeof sort !== "string") {
    throw new Error("Invalid sort: must be a string.");
  }
  return instance
    .get("products", {
      params: { page, pageSize, search, sort },
    })
    .then((res) => {
      return res.data.products;
    })
    .catch((error) => {
      console.log("Error:", error.message);
      throw error;
    });
}

export function getTotalCount(page, pageSize, search, sort) {
  // 유효성 검사 추가
  if (typeof page !== "number" || page < 1) {
    throw new Error("Invalid page: must be a positive number.");
  }
  if (typeof pageSize !== "number" || pageSize < 1) {
    throw new Error("Invalid pageSize: must be a positive number.");
  }
  if (typeof search !== "string") {
    throw new Error("Invalid search: must be a string.");
  }
  if (typeof sort !== "string") {
    throw new Error("Invalid sort: must be a string.");
  }
  return instance
    .get("products", {
      params: { page, pageSize, search, sort },
    })
    .then((res) => {
      return res.data.total;
    })
    .catch((error) => {
      console.log("Error:", error.message);
      throw error;
    });
}

export function postProduct(page, pageSize, search, tag) {
  // 유효성 검사 추가
  if (typeof page !== "number" || page < 1) {
    throw new Error("Invalid page: must be a positive number.");
  }
  if (typeof pageSize !== "number" || pageSize < 1) {
    throw new Error("Invalid pageSize: must be a positive number.");
  }
  if (typeof search !== "string") {
    throw new Error("Invalid search: must be a string.");
  }
  if (typeof tag !== "string") {
    throw new Error("Invalid sort: must be a string.");
  }
  return instance
    .post("products", {
      params: {
        page: page,
        pageSize: pageSize,
        search: search,
        tag: tag,
      },
    })
    .then((res) => {
      return res.data.products;
    })
    .catch((error) => {
      console.log("Error:", error.message);
      throw error;
    });
}
