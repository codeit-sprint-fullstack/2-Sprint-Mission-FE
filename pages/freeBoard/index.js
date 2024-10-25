import styles from "@/styles/FreeBoard.module.css";
import ArticleList from "@/conponents/ArticleList";
import BestArticle from "@/conponents/BestArticle";
import Header from "@/conponents/Header";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import SearchForm from "@/conponents/SeachForm";
import SortDropbox from "@/conponents/SortDropbox";

export async function getServerSideProps(context) {
  const sort = context.query["orderBy"] || "";
  const keyword = context.query["keyword"] || "";

  const resAll = await axios.get(
    `/articles?orderBy=${sort}&keyword=${keyword}`
  );
  const articles = resAll.data.list ?? [];

  const resBest = await axios.get(`/articles?pageSize=3`);
  const bestArticles = resBest.data.list || [];

  return {
    props: {
      articles,
      bestArticles
    }
  };
}

export default function FreeBoard({ articles: initialArticles, bestArticles }) {
  const [articles, setArticles] = useState(initialArticles);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("");

  // 검색 및 정렬을 적용한 결과를 계산
  useEffect(() => {
    let filteredArticles = initialArticles;

    // 1. 검색 필터 적용
    if (keyword) {
      const normalizedKeyword = keyword.replace(/\s+/g, ""); // 검색어에서 띄어쓰기 제거
      filteredArticles = filteredArticles.filter((article) =>
        article.title.replace(/\s+/g, "").includes(normalizedKeyword)
      );
    }

    // 2. 정렬 적용 (최신순만 적용)
    if (order === "recent") {
      filteredArticles = [...filteredArticles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setArticles(filteredArticles);
  }, [keyword, order, initialArticles]);

  return (
    <div className={styles.body}>
      <div className={styles.BestArticlesection}>
        <Header>베스트 게시글</Header>
        <BestArticle bestArticles={bestArticles} />
      </div>
      <div className={styles.articleListSection}>
        <div className={styles.articleListTitle}>
          <Header>게시글</Header>
          <Link href={`/freeBoard/registerArticle`}>
            <button className={styles.postBnt}>글쓰기</button>
          </Link>
        </div>
        <div className={styles.articleSection}>
          <div className={styles.optionSection}>
            <SearchForm setKeyword={setKeyword} />
            <SortDropbox setOrder={setOrder} />
          </div>
          <ArticleList articles={articles} />
        </div>
      </div>
    </div>
  );
}
