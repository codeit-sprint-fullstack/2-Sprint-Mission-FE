import * as article from './ArticleService.js';
import * as product from './ProductService.js';

/* article */
article.getArticleList(1, 5);
article.getArticle(118);
article.createArticle('new title', 'new content', 'new_img');
article.patchArticle(125, 'patch title', 'patch content', 'patch_img');
article.deleteArticle(140);

/* product */
product.getProductList(1,3);
product.getProduct(4);
product.createProduct('new name', 'new description', 400, ['new tags'], ['new imgs']);
product.patchProduct(184, 'patch name', 'patch description', 300, ['patch tags'], ['patch imgs']);
product.deleteProduct(150);