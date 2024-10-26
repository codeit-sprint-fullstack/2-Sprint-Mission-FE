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
import { useRouter } from "next/router";

const ITEMS_PER_PAGE = 5;

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const orderBy = context.query.orderBy || "recent";
  const keyword = context.query.keyword || "";

  const resAll = await axios.get(
    `/articles?page=${page}&pageSize=${ITEMS_PER_PAGE}&orderBy=${orderBy}&keyword=${keyword}`
  );

  const articles = resAll.data.list ?? [];
  const totalCount = resAll.data.totalCount ?? 0;

  const resBest = await axios.get(`/articles?pageSize=3`);
  const bestArticles = resBest.data.list || [];

  return {
    props: {
      initialArticles: articles,
      bestArticles,
      totalCount
    }
  };
}

export default function FreeBoard({
  initialArticles,
  bestArticles,
  totalCount
}) {
  const [articles, setArticles] = useState(initialArticles || []);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  // 서버에서 새로운 페이지의 데이터를 요청하는 함수
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `/articles?page=${page}&pageSize=${ITEMS_PER_PAGE}&orderBy=${order}&keyword=${keyword}`
      );
      setArticles(response.data.list ?? []);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  // 검색, 정렬, 페이지 변경 시 데이터 재요청
  useEffect(() => {
    fetchArticles();

    const query = { page, orderBy: order, keyword };
    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true
    });
  }, [page, keyword, order]);

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
          <Pagination
            page={page}
            setPage={setPage}
            totalCount={totalCount || 0}
            pageSize={ITEMS_PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
}
