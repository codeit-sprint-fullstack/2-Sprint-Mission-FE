import axios from "axios";

const instance = axios.create({
  baseURL: "https://products-lhsi.onrender.com/",
});

function getProducts(page, pageSize, search, sort) {
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

getProducts(1, 10, "콤부차", "recent").then((totalCount) => {
  console.log(totalCount);
});
