import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import BestArticleList from '@/components/Articles/BestArticleList';
import { generateRandomNickname, getRandomInt } from '@/lib/utils';
import formatDate from '@/lib/formatDate';
import styles from '@/components/Articles/ArticlePage.module.css';
import useMaxItems from '@/hooks/useMaxItems';
import ArticleList from '@/components/Articles/ArticleList';

const ARTICLE_COUNT = 5;
export default function ArticlesPage() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const maxBestArticleCount = useMaxItems();

  useEffect(() => {
    // useEffect 내부에서 fetchBestArticles 함수를 정의하고 즉시 호출
    async function fetchBestArticles() {
      setIsLoading(true);
      try {
        const res = await axios.get('/articles', {
          params: {
            page: 1,
            pageSize: maxBestArticleCount,
            orderBy: 'recent',
          },
        });
        const { list } = res.data;

        const bestArticlesWithExtras = list.map((article) => ({
          ...article,
          imageUrl: '/images/articles/img_default_article.png',
          nickname: generateRandomNickname(),
          likes: getRandomInt(0, 20000),
          formattedDate: formatDate(article.createdAt),
        }));

        setBestArticles(bestArticlesWithExtras);
      } catch (error) {
        console.error('베스트 게시글을 가져오는데 실패했습니다:', error);
      }
      setIsLoading(false);
    }

    async function fetchArticles() {
      setIsLoading(true);
      try {
        const res = await axios.get('/articles', {
          params: {
            page: 1,
            pageSize: ARTICLE_COUNT, 
            orderBy: 'recent',
          },
        });
        const { list } = res.data;

        const articlesWithExtras = list.map((article) => ({
          ...article,
          imageUrl: '/images/articles/img_default_article.png',
          nickname: generateRandomNickname(),
          likes: getRandomInt(0, 20000),
          formattedDate: formatDate(article.createdAt),
        }));

        setArticles(articlesWithExtras);
      } catch (error) {
        console.error('게시글을 가져오는데 실패했습니다:', error);
      }
      setIsLoading(false);
    }
    if (maxBestArticleCount !== null) {
      fetchBestArticles(); // maxItems가 있을 때만 함수 호출
      fetchArticles();
    }
  }, [maxBestArticleCount]); // maxItems가 변경될 때만 API 호출

  return (
    <div>
      <h2 className={styles.sectionTitle}>베스트 게시글</h2>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : bestArticles.length > 0 ? (
        <BestArticleList articles={bestArticles} />
      ) : (
        <p>게시글이 없습니다.</p>
      )}

      <h2 className={styles.sectionTitle}>게시글</h2>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
}
