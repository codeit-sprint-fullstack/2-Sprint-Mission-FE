import articles from './ArticleService.js';
import products from './ProductService.js';

const createTestArticle = {
  title: 'TEST Article',
  content: 'TEST Article',
  image: 'TEST Article'
};

const updateTestArticle = {
  title: 'NEW TEST Article',
  content: 'NEW TEST Article',
  image: 'NEW TEST Article'
};

const createTestProduct = {
  name: 'TEST Product',
  description: 'TEST Product',
  price: 1000,
  manufacturer: 'TEST Product',
  tags: ['게임기', '컴퓨터'],
  images: ['TEST Product']
};

const updateTestProduct = {
  name: 'NEW TEST Product',
  description: 'NEW TEST Product',
  price: 9999,
  manufacturer: 'NEW TEST Product',
  tags: ['전자제품', '주방용품'],
  images: ['NEW TEST Product']
};

/* ---- Article ---- */
console.log(await articles.getArticleList(1, 100, 'test'));
console.log('*********************************************');
console.log(await articles.getArticle(85));
console.log('*********************************************');
console.log(await articles.createArticle(createTestArticle));
console.log('*********************************************');
console.log(await articles.patchArticle(348, updateTestArticle));
console.log('*********************************************');
console.log(await articles.deleteArticle(348));

/* ---- Product ---- */
console.log(await products.getProductList(1, 100, 'TEST'));
console.log('*********************************************');
console.log(await products.getProduct(20));
console.log('*********************************************');
console.log(await products.createProduct(createTestProduct));
console.log('*********************************************');
console.log(await products.patchProduct(210, updateTestProduct));
console.log('*********************************************');
console.log(await products.deleteProduct(210));
