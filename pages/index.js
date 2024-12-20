import { useState } from "react";
import styles from "@/styles/Home.module.css";
import axios from "@/lib/axios";
import ArticleBestList from "@/components/ArticleBestList";
import Dropdown from "@/components/Dropdown";
import ArticleList from "@/components/ArticleList";
import Search from "@/components/Search";
import Link from "next/link";

export async function getServerSideProps() {
  const res = await axios.get("/article");
  let articles = res.data.slice(0, 3);
  let articlesAllData = res.data.slice(0, 4);
  return {
    props: {
      articles,
      articlesAllData,
    },
  };
}

export default function Home({ articles, articlesAllData }) {
  const [filteredArticles, setFilteredArticles] = useState(articlesAllData);

  const handleSort = (option) => {
    if (option === "최신순") {
      const sorted = [...filteredArticles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilteredArticles(sorted);
    }
  };
  const options = [{ label: "최신순", action: handleSort }];
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.sectionTitle}>
          <p className={styles.titleFont}>베스트 게시글</p>
        </div>
        <ArticleBestList articles={articles} />
        <div className={styles.articleTable}>
          <div className={styles.sectionTitleMenu}>
            <p className={styles.titleFont}>게시글</p>
            <Link href={"/register"}>
              <button className={styles.writeBt}>글쓰기</button>
            </Link>
          </div>
          <div className={styles.searchTable}>
            <Search
              articlesAllData={articlesAllData}
              onSearch={setFilteredArticles}
            />
            <Dropdown options={options} />
          </div>
          <ArticleList articlesAllData={filteredArticles} />
        </div>
      </div>
    </>
  );
}
