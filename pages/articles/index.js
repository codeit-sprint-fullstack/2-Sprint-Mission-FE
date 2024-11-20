import styles from '@/styles/Article.module.css';
import { useState, useEffect } from 'react';
import { getArticleList, getArticleCount } from '@/lib/api/ArticleService';
import ArticleList from '@/components/ArticleList/ArticleList';
import BestArticleList from '@/components/ArticleList/BestArticleList';
import Search from '@/components/Common/Search';
import Dropdown from '@/components/Common/Dropdown';
import ArticleHeader from '@/components/ArticleList/ArticleHeader';
import Pagination from '@/components/Common/Pagination';
import { useResize } from '@/lib/contexts/useResize';
import Spinner from '@/components/Common/Spinner';
import ErrorMessage from '@/components/Common/ErrorMessage';

export async function getServerSideProps() {
  try {
    const totalCount = await getArticleCount();
    const articles = await getArticleList({ page: 1, pageSize: totalCount });

    const bestArticles = await getArticleList({
      page: 1,
      pageSize: 3,
      orderBy: 'like'
    });

    return {
      props: {
        articles,
        bestArticles
      }
    };
  } catch (err) {
    console.error('데이터를 불러오는 중 문제가 발생하였습니다.', err);
    return {
      props: {
        error: '서버에서 데이터를 가져오는 중 문제가 발생했습니다.'
      }
    };
  }
}

export default function Article({
  articles,
  bestArticles: initialBestArticles,
  error: serverError
}) {
  const [bestArticles] = useState(initialBestArticles);
  const { bestPost } = useResize();
  const bestPageSize = bestPost;
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sortedArticles = sortArticles(filteredArticles, sortOrder);
    setFilteredArticles(sortedArticles);

    setLoading(false);
  }, [sortOrder, filteredArticles]);

  const sortArticles = (articles, sortOrder) => {
    let sortedArticles = [...articles];

    if (sortOrder === 'recent') {
      sortedArticles.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOrder === 'like') {
      sortedArticles.sort((a, b) => b.likeCount - a.likeCount);
    }

    return sortedArticles;
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase())
      );

      const sortedFiltered = sortArticles(filtered, sortOrder);
      setFilteredArticles(sortedFiltered);
      setCurrentPage(1);
    }
  };

  const totalPages = Math.ceil(filteredArticles.length / pageSize);

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) return <Spinner />;
  if (serverError) return <ErrorMessage message={serverError} />;

  return (
    <div className={styles.wrapper}>
      <BestArticleList
        bestArticles={bestArticles || []}
        bestPageSize={bestPageSize}
      />
      <div className={styles.articles}>
        <ArticleHeader />
        <div className={styles[`article-search`]}>
          <Search
            keyword={keyword}
            onSearch={setKeyword}
            onKeyDown={handleSearch}
            width={'105.4rem'}
          />
          <Dropdown
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            type={'article'}
          />
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
