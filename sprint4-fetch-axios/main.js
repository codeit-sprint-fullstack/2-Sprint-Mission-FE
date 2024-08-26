import article from "./ArticleService.js";
import product from "./ProductService.js";

/////////////////////////////////////////////////////
// * TEST code
/////////////////////////////////////////////////////
// console.log(await article.getArticleList());
// console.log(await article.getArticle(81));
// console.log(await article.createArticle({title: "string", content: "string", image: "string"}));
// console.log(await article.patchArticle(258, {title: "new title", content: "new content", image: "new image"}));
// console.log(await article.deleteArticle(257));

// console.log(await product.getProductList());
console.log(await product.getProduct(9));
console.log(await product.createProduct({name: "name", description: "설명", price: 1000, tags: ["tags"], images: ["images"]}));
console.log(await product.patchProduct(9, {name: "new name"}));
// console.log(await product.deleteProduct(9));
