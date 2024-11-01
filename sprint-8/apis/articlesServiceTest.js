import { getArticles } from "./articlesService.js";

async function getArticlesTest() {
  const articles = await getArticles();
  console.log(articles);
}

getArticlesTest();
