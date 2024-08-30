//오류 테스트는 아규먼트의 숫자에 -를 붙이면 됩니다.
import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

//getArticleList() : GET 테스트
const getArticleListData = await getArticleList({ page: 1, pageSize: 10 });
console.log(getArticleListData);

//getArticle() : GET 테스트
const articleData = await getArticle(86);
console.log(articleData);

//createArticle() : POST 테스트
const newArticleData = await createArticle('example', 'example', 'example');
console.log(newArticleData);

//patchArticle() : PATCH  테스트
const patchArticleData = await patchArticle(210, 'example', 'example', 'example');
console.log(patchArticleData);

//deleteArticle() : DELETE 테스트
const deleteArticleData = await deleteArticle(95);
console.log(deleteArticleData);

//getProductList() : GET 테스트
const getProductListData = await getProductList({ page: 1, pageSize: 10 });
console.log(getProductListData);

//getProduct() : GET 테스트
const getProductData = await getProduct(138);
console.log(getProductData);

//createProduct() : POST 테스트
const createProductData = await createProduct('example', 'example', 3, ['example'], ['example']);
console.log(createProductData);

//patchProduct() : PATCH 테스트 
const patchProductData = await patchProduct(36, 'example', 'example', 3, ['example'], ['example']);
console.log(patchProductData);

//deleteProduct() : DELETE 테스트
const deleteProductData = await deleteProduct(72);
console.log(deleteProductData);
