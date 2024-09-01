import * as articleService from './ArticleService.js';
import * as productService from './ProductService.js';

const testArticle = {
  title: 'testArticleTitle',
  content: 'testArticleContent',
  image: ''
};
const patchArticle = {
  title: 'patchArticleTitle',
  content: 'patchArticleContent'
};

try {
  // Promise.all을 쓰지 않은 이유 : 앞에서 가져온 id를 참조하려고 했습니다.
  const getList = await articleService.getArticleList({ page: 1, pageSize: 5 });
  const getId = await articleService.getArticle(getList[0]?.id);
  const create = await articleService.createArticle(testArticle);
  const patch = await articleService.patchArticle(create?.id, patchArticle);
  const del = await articleService.deleteArticle(patch?.id);

  console.log(getList);
  console.log('---------------------------------------------');
  console.log(getId);
  console.log('---------------------------------------------');
  console.log(create);
  console.log('---------------------------------------------');
  console.log(patch);
  console.log('---------------------------------------------');
  console.log(del);
} catch (error) {
  // console.log(error);
} finally {
  console.log('--------------Aricle END--------------');
}

const testProduct = {
  name: 'testProductName',
  description: 'testProductDescription',
  price: 5000,
  manufacturer: 'testProductManufacturer',
  tags: ['test'],
  images: ['']
};
const patchProduct = {
  name: 'patchProductName',
  description: 'patchProductDescription'
};

try {
  const getList = await productService.getProductList({ page: 1, pageSize: 5 });
  const getId = await productService.getProduct(getList[0]?.id);
  const create = await productService.createProduct(testProduct);
  const patch = await productService.patchProduct(create?.id, patchProduct);
  const del = await productService.deleteProduct(patch?.id);

  console.log(getList);
  console.log('---------------------------------------------');
  console.log(getId);
  console.log('---------------------------------------------');
  console.log(create);
  console.log('---------------------------------------------');
  console.log(patch);
  console.log('---------------------------------------------');
  console.log(del);
} catch (error) {
  console.log(error.message);
} finally {
  console.log('--------------Product END--------------');
}
