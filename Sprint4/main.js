import articles, { createArticle } from './ArticleService.js';
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
try {
  const getArticleList = await articles.getArticleList(1, 3, 'test');
  const getArticle = await articles.getArticle(getArticleList[0].id);
  const createArticle = await articles.createArticle(createTestArticle);
  const updateArticle = await articles.patchArticle(
    createArticle.id,
    updateTestArticle
  );
  const deleteArticle = await articles.deleteArticle(updateArticle.id);

  console.log(getArticleList);
  console.log('*********************************************');
  console.log(getArticle);
  console.log('*********************************************');
  console.log(createArticle);
  console.log('*********************************************');
  console.log(updateArticle);
  console.log('*********************************************');
  console.log(deleteArticle);
} catch (err) {
  console.log('!! ----- 경고 : 에러 발생 ----- !!');
  console.log(err.response.status);
} finally {
  console.log('!! ----- Article Service 종료 ----- !!');
}

// /* ---- Product ---- */
try {
  const getProductList = await products.getProductList(1, 3, 'TEST');
  const getProduct = await products.getProduct(getProductList[0].id);
  const createProduct = await products.createProduct(createTestProduct);
  const updateProduct = await products.patchProduct(
    createProduct.id,
    updateTestProduct
  );
  const deleteProduct = await products.deleteProduct(updateProduct.id);

  console.log(getProductList);
  console.log('*********************************************');
  console.log(getProduct);
  console.log('*********************************************');
  console.log(createProduct);
  console.log('*********************************************');
  console.log(updateProduct);
  console.log('*********************************************');
  console.log(deleteProduct);
} catch (err) {
  console.log('!! ----- 경고 : 에러 발생 ----- !!');
  console.log(err.response.status);
} finally {
  console.log('!! ----- Product Service 종료 ----- !!');
}
