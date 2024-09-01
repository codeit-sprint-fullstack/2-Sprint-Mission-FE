import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

async function main() {

    const articles = await getArticleList(1, 5, 'XX');
    console.log('Articles:', articles);

    const article = await getArticle(6);
    console.log('Article:', article);


    const newArticle = await createArticle('New Title', 'New Content', 'image_url');
    console.log('Created Article:', newArticle);

    const patchedArticle = await patchArticle(1, { title: 'patched Title' });
    console.log('patched Article:', patchedArticle);


    const deletedArticle = await deleteArticle(1);
    console.log('Deleted Article:', deletedArticle);


    const products = await getProductList();
    console.log('Products:', products);


    const product = await getProduct(1);
    console.log('Product:', product);


    const newProduct = await createProduct('New Product', 'Great Product', '$10', 'apple', ['image_url']);
    console.log('Created Product:', newProduct);


    const patchedProduct = await patchProduct(1, { price: $20 });
    console.log('patched Product:', patchedProduct);

    const deletedProduct = await deleteProduct(1);
    console.log('Deleted Product:', deletedProduct);
};

main();