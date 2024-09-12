import article from "./ArticleService.js";
import product from "./ProductService.js";

/* article */
article.getArticleList(1, 5);
article.getArticle(118);
article.createArticle("new title", "new content", "new_img");
article.patchArticle(125, {
  title: "asddas",
  content: "striadsdang",
  image: "string",
});
article.deleteArticle(140);

/* product */
const testProduct = {
  name: "Test Product",
  description: "This is a test product description.",
  price: 100,
  tags: ["electronics"], // 배열로 전달되는 tags
  images: ["image1.jpg", "image2.jpg"], // 배열로 전달되는 images
};

product.getProductList(1, 3);
product.getProduct(4);
product.createProduct(testProduct);
product.patchProduct(testProduct);
product.deleteProduct(150);
