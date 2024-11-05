import styles from '@/styles/Home.module.css';
import RecentArticle from '@/components/RecentArticle';
import ArticleList from '@/components/ArticleList';
import { useEffect, useState } from 'react';
import SearchForm from '@/components/SearchForm';
import Link from 'next/link';
import { instance } from '@/lib/api';

export default function Home() {
  const [recentArticles, setRecentArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState([]);
  const [value, setValue] = useState('');
  const [sort, setSort] = useState('');

  async function getRecentArticles() {
    try {
      const res = await instance.get(`/articles?sort=recent`);
      const articles = await res.data;
      setRecentArticles(articles);
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(error.message);
      }
    }
  }

  async function getArticleList(sort) {
    try {
      const res = await instance.get(`/articles?sort=${sort}`);
      const articles = await res.data;
      setArticles(articles);
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(error.message);
      }
    }
  }

  async function getSearchArticle(value) {
    try {
      if (value) {
        const res = await instance(`/articles?search=${value}`);
        const articles = await res.data;
        setSearchArticle(articles);
      } else {
        setSearchArticle([]);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(error.message);
      }
    }
  }

  useEffect(() => {
    getRecentArticles();
    getArticleList(sort);

    if (value) {
      getSearchArticle(value);
    } else {
      getArticleList();
    }
  }, [value, sort]);

  return (
    <>
      <div className={styles.home}>
        <section className={styles.recentSection}>
          <span>베스트 게시글</span>
          <RecentArticle articles={recentArticles.slice(0, 3)} />
        </section>
        <section className={styles.articleSection}>
          <div className={styles.btnContainer}>
            <h2>게시글</h2>
            <Link href="/registerArticle">
              <button>글쓰기</button>
            </Link>
          </div>
          <SearchForm initialValue={value} onChange={setValue} sort={setSort} />
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
