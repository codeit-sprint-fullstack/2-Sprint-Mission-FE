import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService";


// Article

getArticleList();

getArticle(379);

const newArticleData = {
  "title": "제목1",
  "content": "이것은 내용입니다.",
  "image": "이미지소스URL1"
}

createArticle(newArticleData);

const changeArticleData = {
  "image": "이미지소스URL2"
}

patchArticle(380, changeArticleData);

deleteArticle(381);


// Product

getProductList();

getProduct(243);

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

createProduct(newProductData);

const changeProductData = {
  "price": 999900
}

patchProduct(244, changeProductData);

deleteProduct(245);
