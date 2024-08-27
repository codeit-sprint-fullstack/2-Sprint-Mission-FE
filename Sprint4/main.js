import articles, { deleteArticle, patchArticle } from './ArticleService.js';
// import products from './ProductService.js';

const testArticle = {
  title: 'TEST Article',
  content: 'TEST Article',
  image: 'TEST Article'
};

const updateArticle = {
  title: 'NEW TEST Article',
  content: 'NEW TEST Article',
  image: 'NEW TEST Article'
};

// console.log(await articles.getArticleList(1, 100, 'test'));
// console.log(await articles.getArticle(85));
// console.log(await articles.createArticle(testArticle));
// console.log(await patchArticle(332, updateArticle));
// console.log(await deleteArticle(332));
