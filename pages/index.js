import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import ArticleList from '@/components/ArticleList/ArticleList';
import BestArticleList from '@/components/BestArticleList/BestArticleList';

export default function Home() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  const paramsBest = {
    page: 1,
    pageSize: 3,
    order: 'recent',
    keyword: ''
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
  }

  useEffect(() => {
    getBestArticles();
    getArticles();
  }, []);

  return (
    <>
      <BestArticleList bestArticles={bestArticles} />
      <ArticleList articles={articles} />
    </>
  );
}
