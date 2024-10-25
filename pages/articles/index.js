import { useEffect, useState } from 'react';
import BestArticleList from '@/components/Articles/BestArticleList';
import { generateRandomNickname, getRandomInt } from '@/lib/utils';
import formatDate from '@/lib/formatDate';
import styles from '@/components/Articles/ArticlePage.module.css';
import useMaxItems from '@/hooks/useMaxItems';
import ArticleList from '@/components/Articles/ArticleList';
import { getArticleList } from '@/lib/api/ArticleService';

const ARTICLE_COUNT = 5;

export default function ArticlesPage() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [bestArticlesLoading, setBestArticlesLoading] = useState(false);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [error, setError] = useState(null);
  const maxBestArticleCount = useMaxItems();

  useEffect(() => {
    const fetchArticlesData = async (fetchFunc, setFunc, setLoadingFunc) => {
      setLoadingFunc(true);
      try {
        const data = await fetchFunc();
        const articlesWithExtras = data.map((article) => ({
          ...article,
          imageUrl: '/images/articles/img_default_article.png',
          nickname: generateRandomNickname(),
          likes: getRandomInt(0, 20000),
          formattedDate: formatDate(article.createdAt),
        }));
        setFunc(articlesWithExtras);
      } catch (error) {
        console.error('게시글을 가져오는데 실패했습니다:', error);
        setError('게시글을 불러오는 데 문제가 발생했습니다.');
      } finally {
        setLoadingFunc(false);
      }
    };

    if (maxBestArticleCount !== null) {
      fetchArticlesData(
        () => getArticleList({ page: 1, pageSize: maxBestArticleCount, orderBy: 'recent' }),
        setBestArticles,
        setBestArticlesLoading
      );
      fetchArticlesData(
        () => getArticleList({ page: 1, pageSize: ARTICLE_COUNT, orderBy: 'recent' }),
        setArticles,
        setArticlesLoading
      );
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

      <h2 className={styles.sectionTitle}>게시글</h2>
      {articlesLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
}
