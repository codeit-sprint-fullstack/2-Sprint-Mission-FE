import styles from '@/styles/Home.module.css';
import RecentArticle from '@/components/RecentArticle';
import ArticleList from '@/components/ArticleList';
import { useEffect, useState } from 'react';
import SearchForm from '@/components/SearchForm';

export default function Home() {
  const [recentArticles, setRecentArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState([]);
  const [value, setValue] = useState('');

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

  async function getSearchArticle(value) {
    if (value) {
      const res = await fetch(`http://localhost:5000/articles?search=${value}`);
      const articles = await res.json();
      setSearchArticle(articles);
    } else {
      setSearchArticle([]);
    }
  }

  useEffect(() => {
    getRecentArticles();

    if (value) {
      getSearchArticle(value);
    } else {
      getArticleList();
    }
  }, [value]);

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
          <SearchForm initialValue={value} onChange={setValue} />
          {value ? (
            <ArticleList articles={searchArticle} />
          ) : (
            <ArticleList articles={articles} />
          )}
        </section>
      </div>
    </>
  );
}
