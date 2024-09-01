import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js";

// Article API
function article() {
  getArticleList(1, 10, "")
    .then((articleList) => {
      console.log("getArticleList:", articleList);
      return getArticle(256);
    })
    .then((article) => {
      console.log("getArticle:", article);
      return createArticle({
        title: "이름",
        content: "콘텐츠",
        image: "이미지",
      });
    })
    .then((postArticle) => {
      console.log("createArticle:", postArticle);
      return patchArticle(256, {
        title: "타이틀 수정",
        content: "콘텐츠 수정",
        image: "이미지 수정",
      });
    })
    .then((updateArticle) => {
      console.log("patchArticle:", updateArticle);
      // return deleteArticle(85);
    })
    .then((removeProduct) => {
      console.log("deleteProduct:", removeProduct);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    })
    .finally(() => {
      console.log("Done");
    });
}

//article();

// Product API
function product() {
  getProductList(1, 10, "")
    .then((productList) => {
      console.log("getProductList:", productList);
      return getProduct(20);
    })
    .then((product) => {
      console.log("getProduct:", product);
      return createProduct({
        name: "이름",
        description: "설명입니다",
        price: 10000,
        manufacturer: "메뉴팩쳐러",
        tags: ["좋다", "아주좋음"],
        images: [""],
      });
    })
    .then((postProduct) => {
      console.log("createProduct:", postProduct);
      return patchProduct(275, {
        name: "수정된 이름",
        description: "수정된 설명입니다",
        price: 10000,
        manufacturer: "수정된 메뉴팩쳐러",
        tags: ["또 수정됨", "수정"],
        images: [""],
      });
    })
    .then((updateProduct) => {
      console.log("patchProduct:", updateProduct);
      //return deleteProduct(36);
    })
    .then((removeProduct) => {
      console.log("deleteProduct:", removeProduct);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    })
    .finally(() => {
      console.log("Done");
    });
}

product();
