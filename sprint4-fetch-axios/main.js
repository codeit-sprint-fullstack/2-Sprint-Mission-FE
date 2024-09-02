import articleService from "./ArticleService.js";
import productService from "./ProductService.js";

/////////////////////////////////////////////////////
// * TEST code
/////////////////////////////////////////////////////
console.log(await articleService.getArticleList({page: 1, pageSize: 3}));
console.log(await articleService.getArticle(81));
console.log(await articleService.createArticle({title: "string", content: "string", image: "string"}));
console.log(await articleService.patchArticle(258, {title: "new title", content: "new content", image: "new image"}));
console.log(await articleService.deleteArticle(257));

console.log(await productService.getProductList({page: 1, pageSize: 3}));
console.log(await productService.getProduct(9));
console.log(await productService.createProduct({name: "name", description: "설명", price: 1000, tags: ["tags"], images: ["images"]}));
console.log(await productService.patchProduct(9, {name: "new name"}));
console.log(await productService.deleteProduct(9));
