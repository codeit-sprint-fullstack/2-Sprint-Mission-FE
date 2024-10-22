import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import ArticleList from '@/components/ArticleList/ArticleList';
import BestArticleList from '@/components/BestArticleList/BestArticleList';
import Search from '@/components/ArticleList/Search';
import Dropdown from '@/components/ArticleList/Dropdown';
import ArticleHeader from '@/components/ArticleList/ArticleHeader';

export default function Home() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [keyword, setKeyword] = useState('');

  const paramsBest = {
    page: 1,
    pageSize: 3,
    order: 'recent'
  };

  const paramsAll = {
    page: 1,
    pageSize: 5,
    order: 'recent',
    keyword: ''
  };

  async function getBestArticles() {
    const res = await axios.get('/articles', { params: paramsBest });
    const bestArticles = res.data ?? [];
    setBestArticles(bestArticles);
  }

  async function getArticles() {
    const res = await axios.get('/articles', { params: paramsAll });
    const articles = res.data ?? [];
    setArticles(articles);
    setFilteredArticles(res.data ?? []);
  }

  useEffect(() => {
    getBestArticles();
    getArticles();
  }, []);

  useEffect(() => {
    if (keyword) {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [keyword, articles]);

  return (
    <div className={styles.wrapper}>
      <BestArticleList bestArticles={bestArticles} />
      <div className={styles.articles}>
        <ArticleHeader />
        <div className={styles[`article-search`]}>
          <Search keyword={keyword} onSearch={setKeyword} />
          <Dropdown />
        </div>
        <ArticleList articles={filteredArticles} />
      </div>
    </div>
  );
}
