import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import ArticleList from '@/components/ArticleList/ArticleList';

export default function Home() {
  const [articles, setArticles] = useState([]);

  async function getArticles() {
    const res = await axios.get('/articles');
    const articles = res.data ?? [];
    setArticles(articles);
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <ArticleList articles={articles} />
    </>
  );
}
