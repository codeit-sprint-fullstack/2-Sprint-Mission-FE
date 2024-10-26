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

  const [resAll, resBest] = await Promise.all([
    axios.get(
      `/articles?page=${page}&pageSize=${ITEMS_PER_PAGE}&orderBy=${orderBy}&keyword=${keyword}`
    ),
    axios.get(`/articles?pageSize=3`)
  ]);

  const articles = resAll.data.list ?? [];
  const totalCount = resAll.data.totalCount ?? 0;
  const bestArticles = resBest.data.list || [];

  return {
    props: {
      initialArticles: articles,
      bestArticles,
      initialTotalCount: totalCount
    }
  };
}

export default function FreeBoard({
  initialArticles,
  bestArticles,
  initialTotalCount
}) {
  const [articles, setArticles] = useState(initialArticles || []);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(initialTotalCount || 0);
  const router = useRouter();

  // 서버에서 새로운 페이지의 데이터를 요청하는 함수
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `/articles?page=${page}&pageSize=${ITEMS_PER_PAGE}&orderBy=${order}&keyword=${keyword}`
      );
      const { list, totalCount } = response.data;

      setArticles(list ?? []);
      setTotalCount(totalCount ?? 0);

      // 현재 페이지가 totalPage보다 클 경우 페이지를 첫 페이지로 리셋
      const totalPage = Math.ceil(totalCount / ITEMS_PER_PAGE);
      if (page > totalPage) {
        setPage(1);
      }
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
            totalCount={totalCount}
            pageSize={ITEMS_PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
}
