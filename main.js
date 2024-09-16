import {
  getArticleList,
  getArticle,
  createArticle,
  deleteArticle,
  patchArticle,
} from "./ArticleService.js";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

const testArticle = {
  title: "제목",
  content: "내용",
  image: "이미지",
};

const testArticleList = await getArticleList().catch((err) =>
  console.error(err.message)
); //{page:1, pageSize:100, keyword:''}

const testArticleId = await getArticle(103).catch((err) =>
  console.error(err.message)
);
console.log(testArticleId);

const testCreateArticle = await createArticle(testArticle).catch((err) =>
  console.error(err.message)
); //{title, content, image}
console.log(testCreateArticle);

const testPatchArticle = await patchArticle(103, testArticle).catch((err) =>
  console.error(err.message)
);
console.log(testPatchArticle);
await deleteArticle(208);

const testProduct = {
  name: "string",
  description: "string",
  price: 100,
  manufacturer: "string",
  tags: ["string"],
  images: ["string"],
};

const testProductList = await getProductList().catch((err) =>
  console.error(err.message)
);
console.log(testProductList);

const testProductId = await getProduct(20).catch((err) =>
  console.error(err.message)
);
console.log(testProductId);

const testCreateProduct = await createProduct(testProduct).catch((err) =>
  console.error(err.message)
);
console.log(testCreateProduct);

const testPatchProduct = await patchProduct(9, testProduct).catch((err) =>
  console.error(err.message)
);
console.log(testPatchProduct);

const testDeleteProduct = await deleteProduct(20).catch((err) =>
  console.error(err.message)
);
