import { useEffect, useState } from 'react';
import BestArticleList from '@/components/Articles/BestArticleList';
import { generateRandomNickname, getRandomInt } from '@/lib/utils';
import formatDate from '@/lib/formatDate';
import styles from '@/styles/ArticlePage.module.css';
import useMaxItems from '@/hooks/useMaxItems';
import ArticleList from '@/components/Articles/ArticleList';
import { getArticleList } from '@/lib/api/ArticleService';
import Link from 'next/link';
import { getDeviceTypeInitialCount } from '@/lib/getDeviceTypeInitialCount';

export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent'];
  const { bestArticleCount: initialBestArticleCount } = getDeviceTypeInitialCount(userAgent);

  const maxArticleCount = 5;
  try {
    const bestArticlesData = await getArticleList({ page: 1, pageSize: initialBestArticleCount, orderBy: 'recent' });
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
        initialArticles: articles,
        initialBestArticleCount,
      }
    }  
  } catch (error) {
    console.error('데이터 로드 오류', error);
    return {
      props: {
        initialBestArticles: [],
        initialArticles: [],
        initialBestArticleCount: 0
      }
    }
  }
}

export default function ArticlesPage({ initialBestArticles, initialArticles,  initialBestArticleCount}) {
  const maxBestArticleCount = useMaxItems() || initialBestArticleCount; // 클라이언트에서만 접근 가능
  const [displayedBestArticles, setDisplayedBestArticles] = useState(initialBestArticles);

  useEffect(() => {
    if (initialBestArticles && maxBestArticleCount) {
        setDisplayedBestArticles(initialBestArticles.slice(0, maxBestArticleCount));
    }
}, [maxBestArticleCount, initialBestArticles]);

  return (
    <div>
      <h2 className={styles.sectionTitle}>베스트 게시글</h2>

      {displayedBestArticles.length > 0 ? (
        <BestArticleList articles={displayedBestArticles} />
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
