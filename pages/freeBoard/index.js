import styles from "@/styles/FreeBoard.module.css";
import ArticleList from "@/conponents/ArticleList";
import BestArticle from "@/conponents/BestArticle";
import Header from "@/conponents/Header";
import axios from "@/lib/axios";
import { useState } from "react";
import Link from "next/link";

export async function getServerSideProps(context) {
  const sort = context.query["orderBy"] || "";
  const keyword = context.query["keyword"] || "";

  const resAll = await axios.get(
    `/articles?orderBy=${sort}&keyword=${keyword}`
  );
  const articles = resAll.data.list ?? [];

  const resBest = await axios.get(`/articles?pageSize=3`);
  const bestArticles = resBest.data.list || [];

  // console.log("articles", articles);
  // console.log("bestArticles", bestArticles);
  return {
    props: {
      articles,
      bestArticles
    }
  };
}

export default function FreeBoard({ articles, bestArticles }) {
  return (
    <div className={styles.body}>
      <div className={styles.section}>
        <Header>베스트 게시글</Header>
        <BestArticle bestArticles={bestArticles} />
      </div>
      <div className={styles.section}>
        <div className={styles.articleListTitle}>
          <Header>게시글</Header>
          <Link href={`/freeBoard/register`}>
            <button className={styles.postBnt}>글쓰기</button>
          </Link>
        </div>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
