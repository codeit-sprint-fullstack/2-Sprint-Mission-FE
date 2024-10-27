import { useEffect, useState } from 'react';
import BestArticleList from '@/components/Articles/BestArticleList';
import { generateRandomNickname, getRandomInt } from '@/lib/utils';
import formatDate from '@/lib/formatDate';
import styles from './ArticlePage.module.css';
import useMaxItems from '@/hooks/useMaxItems';
import ArticleList from '@/components/Articles/ArticleList';
import { getArticleList } from '@/lib/api/ArticleService';
import Link from 'next/link';

export async function getServerSideProps() {
  const maxBestArticleCount = 3;
  const maxArticleCount = 5;

  try {
    const bestArticlesData = await getArticleList({ page: 1, pageSize: maxBestArticleCount, orderBy: 'recent' });
    const bestArticles = bestArticlesData.map((article) => ({
      ...article,
      imageUrl: '/images/articles/img_default_article.png',
      nickname: generateRandomNickname(),
      likes: getRandomInt(0, 20000),
      formattedDate: formatDate(article.createdAt),
    }));

    const articlesData = await getArticleList({ page: 1, pageSize: maxArticleCount, orderBy: 'recent' });
    const articles = articlesData.map((article) => ({
      ...article,
      imageUrl: '/images/articles/img_default_article.png',
      nickname: generateRandomNickname(),
      likes: getRandomInt(0, 20000),
      formattedDate: formatDate(article.createdAt),
    }));
    
    return {
      props: {
        initialBestArticles: bestArticles,
        initialArticles: articles
      }
    }  
  } catch (error) {
    console.error('데이터 로드 오류', error);
    return {
      props: {
        initialBestArticles: [],
        initialArticles: []
      }
    }
  }
}

export default function ArticlesPage({ initialBestArticles, initialArticles }) {
  const [bestArticles, setBestArticles] = useState(initialBestArticles);
  const maxBestArticleCount = useMaxItems(); // 클라이언트에서만 접근 가능

  // 화면 사이즈에 맞춰 베스트 게시글 수 업데이트
  useEffect(() => {
    const fetchAdjustedBestArticles = async () => {
      try {
        const adjustedData = await getArticleList({ page: 1, pageSize: maxBestArticleCount, orderBy: 'recent' });
        const adjustedArticles = adjustedData.map((article) => ({
          ...article,
          imageUrl: '/images/articles/img_default_article.png',
          nickname: generateRandomNickname(),
          likes: getRandomInt(0, 20000),
          formattedDate: formatDate(article.createdAt),
        }));
        setBestArticles(adjustedArticles);
      } catch (error) {
        console.error('화면 크기에 맞춘 베스트 게시글 로드 실패:', error);
      }
    };
    fetchAdjustedBestArticles();
  }, [maxBestArticleCount]); 

  return (
    <div>
      <h2 className={styles.sectionTitle}>베스트 게시글</h2>

      {bestArticles.length > 0 ? (
        <BestArticleList articles={bestArticles} />
      ) : (
        <p>베스트 게시글이 없습니다.</p>
      )}

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>게시글</h2>
        <Link href="/articles/write" className={styles.writeBtn}>글쓰기</Link>
      </div>
      <ArticleList initialArticles={initialArticles} />  
    </div>
  );
}
