import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import ArticleList from '@/components/ArticleList/ArticleList';
import BestArticleList from '@/components/BestArticleList/BestArticleList';
import Search from '@/components/ArticleList/Search';
import Dropdown from '@/components/ArticleList/Dropdown';
import ArticleHeader from '@/components/ArticleList/ArticleHeader';
import Pagination from '@/components/ArticleList/Pagination';
import useResize from '@/hooks/useResize';

export default function Home() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const bestPageSize = useResize();
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const paramsBest = {
    page: 1,
    pageSize: bestPageSize,
    order: 'recent'
  };

  const paramsAll = {
    page: 1,
    order: 'sortOrder',
    keyword: ''
  };

  async function getBestArticles() {
    const res = await axios.get('/articles', { params: paramsBest });
    const bestArticles = res.data ?? [];
    setBestArticles(bestArticles);
  }

  async function getArticles() {
    const res = await axios.get('/articles', { params: paramsAll });
    const articles = Array.isArray(res.data) ? res.data : [];
    setArticles(articles);
    setFilteredArticles(res.data ?? []);
  }

  useEffect(() => {
    getBestArticles();
  }, [bestPageSize]);

  useEffect(() => {
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

  useEffect(() => {
    getArticles();
  }, [sortOrder]);

  const totalPages = Math.ceil(filteredArticles.length / pageSize);

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.wrapper}>
      <BestArticleList bestArticles={bestArticles} />
      <div className={styles.articles}>
        <ArticleHeader />
        <div className={styles[`article-search`]}>
          <Search keyword={keyword} onSearch={setKeyword} />
          <Dropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
        <ArticleList articles={currentArticles || []} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
