import ArticleService from './api/ArticleService.js';
import ProductService from './api/ProductService.js';

async function processArticlesAndProducts() {
  // Article 처리
  const articles = await ArticleService.getArticleList(1, 10, '스프린트4');
  console.log('Article List:', articles);

  const firstArticleId = articles[0].id; // 첫 번째 게시글의 ID
  const lastArticleId = articles[articles.length - 1].id; // 마지막 게시글의 ID

  // 첫 번째 게시글의 상세 정보 조회
  const singleArticle = await ArticleService.getArticle(firstArticleId);
  console.log('Single Article:', singleArticle);

  // 첫 번째 게시글 정보 수정
  const patchedArticle = await ArticleService.patchArticle(firstArticleId, { title: 'Updated Title' });
  console.log('Patched Article:', patchedArticle);

  // 마지막 게시글 삭제
  const deleteArticleSuccess = await ArticleService.deleteArticle(lastArticleId);
  if (deleteArticleSuccess) {
    console.log('Article deleted successfully');
  }

  //새로운 Article 생성
  const createdArticle = await ArticleService.createArticle('스프린트4', 'This is the content of the new article.', 'image-url');
  console.log('Created Article:', createdArticle);

  // Product 처리
  const products = await ProductService.getProductList(1, 10, '스프린트4');
  console.log('Product List:', products);

  const firstProductId = products[0].id; // 첫 번째 상품의 ID
  const lastProductId = products[products.length - 1].id; // 마지막 상품의 ID

  // 첫 번째 상품의 상세 정보 조회
  const singleProduct = await ProductService.getProduct(firstProductId);
  console.log('Single Product:', singleProduct);

  // 첫 번째 상품 정보 수정
  const patchedProduct = await ProductService.patchProduct(firstProductId, { price: 150 });
  console.log('Patched Product:', patchedProduct);

  // 마지막 상품 삭제
  const deleteProductSuccess = await ProductService.deleteProduct(lastProductId);
  if (deleteProductSuccess) {
    console.log('Product deleted successfully');
  }

  // 새로운 Product 생성
  const createdProduct = await ProductService.createProduct('스프린트4', 'This is the description of the new product.', 100, ['tag1', 'tag2'], ['image-url']);
  console.log('Created Product:', createdProduct);
}

// 비동기 함수 실행
processArticlesAndProducts();