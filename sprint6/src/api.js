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

export function postProduct(name, description, price, tag) {
  // 유효성 검사 추가
  if (typeof name !== "string") {
    throw new Error("Invalid name: must be a string.");
  }
  if (typeof description !== "string") {
    throw new Error("Invalid description: must be a string.");
  }
  if (typeof price !== "number" || price < 1) {
    throw new Error("Invalid price: must be a positive number.");
  }
  if (!Array.isArray(tag)) {
    throw new Error("Invalid tag: must be an array.");
  }

  return instance
    .post("products", {
      name: name,
      description: description,
      price: price,
      tag: tag,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error:", error.message);
      throw error;
    });
}

// Test the function
postProduct("새 상품이름", "새 상품입니당", 9000, ["test", "test"]).then((newProduct) => {
  console.log(newProduct);
  return newProduct;
});
