import articles from './ArticleService.js';
import products from './ProductService.js';

// Article API 테스트
articles.getArticleList(1, 10, 'keyword').then(data => console.log(data)).catch(err => console.error(err));
articles.getArticle(1).then(data => console.log(data)).catch(err => console.error(err));
articles.createArticle('Title', 'Content', 'image_url').then(data => console.log(data)).catch(err => console.error(err));
articles.patchArticle(1, { title: 'Updated Title' }).then(data => console.log(data)).catch(err => console.error(err));
articles.deleteArticle(1).then(data => console.log(data)).catch(err => console.error(err));

// Product API 테스트
products.getProductList(1, 10, 'keyword').then(data => console.log(data)).catch(err => console.error(err));
products.getProduct(1).then(data => console.log(data)).catch(err => console.error(err));
products.createProduct({
    name: 'Product Name',
    description: 'Description',
    price: 100,
    manufacturer: 'Manufacturer Name',
    tags: ['tag1', 'tag2'],
    images: ['image_url']
}).then(data => console.log(data)).catch(err => console.error(err));
products.patchProduct(1, { name: 'Updated Product Name' }).then(data => console.log(data)).catch(err => console.error(err));
products.deleteProduct(1).then(data => console.log(data)).catch(err => console.error(err));
