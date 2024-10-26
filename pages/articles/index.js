import { useEffect, useState } from 'react';
import BestArticleList from '@/components/Articles/BestArticleList';
import { generateRandomNickname, getRandomInt } from '@/lib/utils';
import formatDate from '@/lib/formatDate';
import styles from './ArticlePage.module.css';
import useMaxItems from '@/hooks/useMaxItems';
import ArticleList from '@/components/Articles/ArticleList';
import { getArticleList } from '@/lib/api/ArticleService';
import Link from 'next/link';

export default function ArticlesPage() {
  const [bestArticles, setBestArticles] = useState([]);
  const [bestArticlesLoading, setBestArticlesLoading] = useState(false);
  const [error, setError] = useState(null);
  const maxBestArticleCount = useMaxItems();

  useEffect(() => {
    const fetchBestArticles = async () => {
      setBestArticlesLoading(true);
      try {
        const data = await getArticleList({ page: 1, pageSize: maxBestArticleCount, orderBy: 'recent' });
        const articlesWithExtras = data.map((article) => ({
          ...article,
          imageUrl: '/images/articles/img_default_article.png',
          nickname: generateRandomNickname(),
          likes: getRandomInt(0, 20000),
          formattedDate: formatDate(article.createdAt),
        }));
        setBestArticles(articlesWithExtras);
      } catch (error) {
        console.error('베스트 게시글을 가져오는데 실패했습니다:', error);
        setError('베스트 게시글을 불러오는 데 문제가 발생했습니다.');
      } finally {
        setBestArticlesLoading(false);
      }
    };

    if (maxBestArticleCount !== null) {
      fetchBestArticles();
    }
  }, [maxBestArticleCount]);

  return (
    <div>
      <h2 className={styles.sectionTitle}>베스트 게시글</h2>
      {bestArticlesLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : bestArticles.length > 0 ? (
        <BestArticleList articles={bestArticles} />
      ) : (
        <p>베스트 게시글이 없습니다.</p>
      )}

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>게시글</h2>
        <Link href="/articles/write" className={styles.writeBtn}>글쓰기</Link>
      </div>
      <ArticleList />    {/*  ArticleList 자체적으로 데이터 로딩*/}
    </div>
  );
}
