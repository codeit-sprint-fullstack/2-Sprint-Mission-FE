import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./api/ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./api/ProductService.js";

const testArticleData = {
    title: 'test article',
    content: 'test article content',
    image: '',
};

const testPatchArticleData = {
    title: 'patch article',
    content: 'patch article content',
    // image: '',
};

try {
    const getArticleData = await getArticleList({page: 1, pageSize: 10});
    const getArticleDataById = await getArticle(85);
    const createArticleData = await createArticle(testArticleData);
    const patchArticleData = await patchArticle(createArticleData?.id, testPatchArticleData);
    const deleteArticleData = await deleteArticle(patchArticleData?.id);

    console.log(getArticleData);
    console.log('------');
    console.log(getArticleDataById);
    console.log('------');
    console.log(createArticleData);
    console.log('------');
    console.log(patchArticleData);
    console.log('------');
    console.log(deleteArticleData);

} catch(e){
    console.log('error: ', e.message);
} finally {
    console.log('------print article data finished------');
}

const testProductData = {
    name: 'test product',
    description: 'test product description',
    price: 10000,
    manufacturer: 'test manufacturer',
    tags: ['test', 'product'],
    images: [''],
};

const testPatchProductData = {
    name: 'patch product',
    description: 'patch product description',
};

try {
    const getProductData = await getProductList({page: 1, pageSize: 10});
    const getProductDataById = await getProduct(5);
    const createProductData = await createProduct(testProductData);
    const patchProductData = await patchProduct(createProductData?.id, testPatchProductData);
    const deleteProductData = await deleteProduct(testPatchProductData?.id);

    console.log(getProductData);
    console.log('------');
    console.log(getProductDataById);
    console.log('------');
    console.log(createProductData);
    console.log('------');
    console.log(patchProductData);
    console.log('------');
    console.log(deleteProductData);
} catch(e) {
    console.log('error: ', e.message);
} finally {
    console.log('------print product data finished------');
}