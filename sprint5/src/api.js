import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

export function getProducts(page, pageSize, orderBy, keyword) {
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

export function totalProducts(page, pageSize, orderBy, keyword) {
  return instance
    .get("/products", {
      params: { page, pageSize, orderBy, keyword },
    })
    .then((res) => {
      const totalCount = res.data.totalCount;
      const totalPages = Math.ceil(totalCount / pageSize);
      const totalPageArray = [];
      for (let i = 1; i <= totalPages; i++) {
        totalPageArray.push(i);
      }
      return totalPageArray; // 페이지 배열 반환
    })
    .catch((error) => {
      console.log("Error:", error.message);
      throw error;
    });
}

// totalProducts(1, 10, "recent", "").then((totalCount) => {
//   const totalPages = Math.ceil(totalCount / 10); // 페이지 수 계산
//   const totalPageArray = [];

//   for (let i = 1; i <= totalPages; i++) {
//     totalPageArray.push(i);
//   }

//   console.log(totalPageArray)
//   return totalPageArray; // 배열 반환
// });
