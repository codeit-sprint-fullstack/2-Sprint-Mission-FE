import styles from '@/styles/Home.module.css';
import RecentArticle from '@/components/RecentArticle';
import ArticleList from '@/components/ArticleList';
import { useEffect, useState } from 'react';

export default function Home() {
  const [recentArticles, setRecentArticles] = useState([]);

  async function getRecentArticles() {
    const res = await fetch(
      'http://localhost:5000/articles?sort=recent&limit=3'
    );
    const articles = await res.json();
    setRecentArticles(articles);
  }

  useEffect(() => {
    getRecentArticles();
  }, []);

  return (
    <>
      <div className={styles.home}>
        <section className={styles.recentSection}>
          <span>베스트 게시글</span>
          <RecentArticle articles={recentArticles} />
        </section>
        <section>
          <div>
            <h2>게시글</h2>
            <button>글쓰기</button>
          </div>
          <form>
            <label>
              <input></input>
            </label>
          </form>
          <ArticleList />
        </section>
      </div>
    </>
  );
}
