import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
} from './api/ArticleService.js';

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
} from './api/ProductService.js';


// Article API 테스트
const articleList = await getArticleList(1, 3, 'test');
console.log('articleList', articleList);

const article = await getArticle(articleList[0].id);
console.log('article', article);

const articleData = {
  'title': '생성 글 제목',
  'content': '내용',
  'image': 'image url'
};
const createdArticle = await createArticle(articleData)
console.log('createdArticle : ', createdArticle);

const articleDataPatch = {
  'title': '수정 글 제목',
  'content': '수정 내용',
};
if(createdArticle) {
  try {
    const patchedArticle = await patchArticle(createdArticle.id, articleDataPatch)
    console.log('patchedArticle : ', patchedArticle);
     
    const deletedArticle = await deleteArticle(patchedArticle.id);
    console.log('deletedArticle', deletedArticle);    
  } catch {
    console.error('Error', error.message)
  }
}


// Product API 테스트
const productList = await getProductList(1, 5, 'test');
//console.log('Product List:', productList);

 const product = await getProduct(productList[0].id);
 //console.log('Product:', product);

const productData = {
  "name": "생성 상품명",
  "description": "상품 설명",
  "price": 500,
  "tags": ["tags1"],
  "images": ["product image1"]
};
const createdProduct = await createProduct(productData);
console.log('Created Product:', createdProduct);

const productPatchData = {
  "name": "생성 상품명 수정",
  "description": "상품 설명 수정",
  "price": 500,
  "tags": ["tags1", "tags2"],
  "images": ["image1", "image2"]
};
if(createdProduct) {
  const patchedProduct = await patchProduct(createdProduct.id, productPatchData);
  console.log('Patched Product:', patchedProduct);

  const deletedProduct = await deleteProduct(patchedProduct.id)
  console.log('Deleted Product:', deletedProduct);
}



