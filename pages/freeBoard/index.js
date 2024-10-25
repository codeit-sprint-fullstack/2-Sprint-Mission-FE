import styles from "@/styles/FreeBoard.module.css";
import ArticleList from "@/conponents/ArticleList";
import BestArticle from "@/conponents/BestArticle";
import Header from "@/conponents/Header";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import SearchForm from "@/conponents/SeachForm";
import SortDropbox from "@/conponents/SortDropbox";
import Pagination from "@/conponents/Pagination";

export async function getServerSideProps() {
  const resAll = await axios.get(`/articles`);
  const articles = resAll.data.list ?? [];
  console.log("articles", articles);
  const resBest = await axios.get(`/articles?pageSize=3`);
  const bestArticles = resBest.data.list || [];

  return {
    props: {
      articles,
      bestArticles
    }
  };
}

const ITEMS_PER_PAGE = 5;

export default function FreeBoard({ articles: initialArticles, bestArticles }) {
  const [articles, setArticles] = useState(initialArticles);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);

  // 페이지에 따른 게시글 슬라이싱
  const paginatedArticles = articles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    let filteredArticles = initialArticles;

    // 검색 필터
    if (keyword) {
      const normalizedKeyword = keyword.replace(/\s+/g, "");
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.replace(/\s+/g, "").includes(normalizedKeyword) ||
          article.content.replace(/\s+/g, "").includes(normalizedKeyword)
      );
    }

    // 정렬 (최신순)
    if (order === "recent") {
      filteredArticles = [...filteredArticles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setArticles(filteredArticles);
    setPage(1); // 새로운 검색이나 정렬 시 페이지를 첫 번째 페이지로 초기화
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
          <ArticleList articles={paginatedArticles} />
          <Pagination
            page={page}
            setPage={setPage}
            totalCount={articles.length}
            pageSize={ITEMS_PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
}
