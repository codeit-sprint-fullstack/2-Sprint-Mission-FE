import articleApi from "./ArticleService.js";
import productApi from "./ProductService.js";

const testArticle = {
  title: "제목",
  content: "내용",
  image: "이미지",
};

const testArticleList = await articleApi
  .getArticleList()
  .catch((err) => console.error(err.message)); //{page:1, pageSize:100, keyword:''}

const testArticleId = await articleApi
  .getArticle(85)
  .catch((err) => console.error(err.message));
console.log(testArticleId);

const testCreateArticle = await articleApi
  .createArticle(testArticle)
  .catch((err) => console.error(err.message)); //{title, content, image}
console.log(testCreateArticle);

const testPatchArticle = await articleApi
  .patchArticle(85, testArticle)
  .catch((err) => console.error(err.message));
console.log(testPatchArticle);

articleApi.deleteArticle(85);

const testProduct = {
  name: "string",
  description: "string",
  price: 100,
  manufacturer: "string",
  tags: ["string"],
  images: ["string"],
};

const testProductList = await productApi
  .getProductList()
  .catch((err) => console.error(err.message));
console.log(testProductList);

const testCreateProduct = await productApi
  .createProduct(testProduct)
  .catch((err) => console.error(err.message));
console.log(testCreateProduct);

const testPatchProduct = await productApi
  .patchProduct(9, testProduct)
  .catch((err) => console.error(err.message));
console.log(testPatchProduct);

const testDeleteProduct = await productApi
  .deleteProduct(120)
  .catch((err) => console.error(err.message));
