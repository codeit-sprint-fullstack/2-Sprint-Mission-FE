import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js";

// Article

console.log('getArticleList-----------')
console.log(await getArticleList());

console.log('getArticle-----------')
console.log(await getArticle(379));

console.log('createArticle-----------')
const newArticleData = {
  "title": "제목1",
  "content": "이것은 내용입니다.",
  "image": "이미지소스URL1"
}
console.log(await createArticle(newArticleData));

console.log('patchArticle-----------')
const changeArticleData = {
  "image": "이미지소스URL2"
}
console.log(await patchArticle(380, changeArticleData));


console.log('deleteArticle-----------')
console.log(await deleteArticle(552));


// Product

console.log('getProductList-----------')
console.log(await getProductList());

console.log('getProduct-----------')
console.log(await getProduct(243));

console.log('createProduct-----------')
const newProductData = {
  "name": "이름",
  "description": "이것은 판다마켓 제품입니다.",
  "price": 999900,
  "manufacturer": "china",
  "tags": [
    "중국산"
  ],
  "images": [
    "이미지소스URL1"
  ]
}
console.log(await createProduct(newProductData));

console.log('patchProduct-----------')
const changeProductData = {
  "price": 999900
}

console.log(await patchProduct(244, changeProductData));

console.log('deleteProduct-----------')
console.log(await deleteProduct(309));
