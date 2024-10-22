import styles from '@/styles/Home.module.css';
import RecentArticle from '@/components/RecentArticle';
import ArticleList from '@/components/ArticleList';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [recentArticles, setRecentArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  async function getRecentArticles() {
    const res = await fetch(
      'http://localhost:5000/articles?sort=recent&limit=3'
    );
    const articles = await res.json();
    setRecentArticles(articles);
  }

  async function getArticleList() {
    const res = await fetch('http://localhost:5000/articles');
    const articles = await res.json();
    setArticles(articles);
  }

  useEffect(() => {
    getRecentArticles();
    getArticleList();
  }, []);

  return (
    <>
      <div className={styles.home}>
        <section className={styles.recentSection}>
          <span>베스트 게시글</span>
          <RecentArticle articles={recentArticles} />
        </section>
        <section className={styles.articleSection}>
          <div className={styles.btnContainer}>
            <h2>게시글</h2>
            <button>글쓰기</button>
          </div>
          <form className={styles.form}>
            <label className={styles.label}>
              <input
                placeholder="검색할 상품을 입력해주세요."
                className={styles.search}
              ></input>
              <div className={styles.searchImg}>
                <Image fill src="/images/ic_search.svg" alt="검색 이미지" />
              </div>
            </label>
            <div></div>
          </form>
          <ArticleList articles={articles} />
        </section>
      </div>
    </>
  );
}
