import axios from "axios";
import articleService from "./ArticleService.js";
import productService from "./ProductService.js";

console.log("----------------------------------------");
console.log("articleService.getArticleList실행");
const testArticleGetList = await articleService.getArticleList(); //page, pagesize, keyword
console.log(testArticleGetList);
console.log("----------------------------------------");
const testArticleGet = await articleService.getArticle(); //id
const testArticleCreate = await articleService.createArticle(); //title,content,image
const testArticlePatch = await articleService.patchArticle(); //id, article
const testArticleDelete = await articleService.deleteArticle(); //id

const productData = {
  name: "Lenevo Desktop",
  description: "비싸요",
  price: 10000,
};
const patchData = {
  name: "MacBook",
  price: 200000,
};
const testId = 19;

try {
  const testProductList = await productService.getProductList();
  console.log("-----------------------------------");
  console.log("productService.getProductList 실행");
  console.log(testProductList);
  console.log("-----------------------------------");
  const testProductGet = await productService.getProduct(testId);
  console.log("-----------------------------------");
  console.log("productService.getProduct 실행");
  console.log(testProductGet);
  console.log("-----------------------------------");
  const testProductCreate = await productService.createProduct(productData);
  console.log("-----------------------------------");
  console.log("productService.createProduct 실행");
  console.log(testProductCreate);
  console.log("-----------------------------------");
  const testProductPatch = await productService.patchProduct(215, patchData);
  console.log("productService.patchProduct 실행");
  console.log(testProductPatch);
  const testDeleteProduct = await productService.deleteProduct(26);
  console.log("-----------------------------------");
  console.log("productService.deleteProduct 실행");
  console.log(testDeleteProduct);
} catch (e) {
  console.error("에러발생");
  console.error(e.message);
  if (e.response) {
    if (e.response.data) {
      console.error(`상태코드: ${e.response.status}`);
      console.error(`에러메시지: ${JSON.stringify(e.response.data)}`);
    } else {
      console.error(`상태코드: ${e.response.status}`);
      console.error(`에러메시지: 데이터가 없습니다.`);
    }
  } else {
    console.error("리퀘스트 실패");
  }
}
