import axios from "axios";
import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js";

// Article API
try {
  const articleList = await getArticleList(1, 10, "");
  //console.log("getArticleList:", articleList);
  const article = await getArticle(103);
  console.log("getArticle:", article);
  const makeArticle = await createArticle({ title: "타이틀이지롱", content: "컨텐츠이지롱", image: "없지롱" });
  console.log("createArticle:", makeArticle);
  const updateArticle = await patchArticle(501, { title: "수정수정", content: "내용 수정" });
  console.log("patchArticle:", updateArticle);
  const removeArticle = await deleteArticle(506);
  console.log("removeArticle:", deleteArticle);
} catch (error) {
  console.error("Error:", error.message);
}

// Product API
try {
  const productList = await getProductList(1, 10, "");
  console.log("getProductList:", productList);
  const product = await getProduct(20);
  console.log("getProduct:", product);
  const postProduct = await createProduct({
    name: "이름",
    description: "설명입니다",
    price: 10000,
    manufacturer: "메뉴팩쳐러",
    tags: ["좋다", "아주좋음"],
    images: [],
  });
  console.log("createProduct:", postProduct);
  const updateProduct = await patchProduct(275, {
    name: "수정된 이름",
    description: "수정된 설명입니다",
    price: 10000,
    manufacturer: "수정된 메뉴팩쳐러",
    tags: ["좋다", "아주좋음"],
    images: [""],
  });
  console.log("patchArticle:", updateProduct);
  const removeProduct = await deleteProduct(36);
  console.log("deleteProduct:", removeProduct);
} catch (error) {
  console.error("Error:", error.message);
}
