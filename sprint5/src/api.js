import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

export default function getProducts(page, pageSize, orderBy, keyword) {
  return instance
    .get("/products", {
      params: { page, pageSize, orderBy, keyword },
    })
    .then((res) => {
      return res.data.list;
    })
    .catch((error) => {
      console.log("Error:", error.message);
      throw error;
    });
}
