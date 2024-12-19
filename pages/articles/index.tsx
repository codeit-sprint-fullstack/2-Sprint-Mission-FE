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
import { ArticleType } from '@/types/type';

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

interface ArticleProps {
  articles: ArticleType[];
  bestArticles: ArticleType[];
  error: string;
}

export default function Article({
  articles,
  bestArticles: initialBestArticles,
  error: serverError
}: ArticleProps) {
  const [bestArticles] = useState<ArticleType[]>(initialBestArticles);

  const resizeContext = useResize();
  if (!resizeContext) return <div>Error: Resize context is not available!</div>;

  const { bestPost } = resizeContext;
  const bestPageSize: number = bestPost;
  const [filteredArticles, setFilteredArticles] =
    useState<ArticleType[]>(articles);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 5;
  const [keyword, setKeyword] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('recent');

  const [loading, setLoading] = useState(true);

  const sortArticles = (
    articles: ArticleType[],
    sortOrder: string
  ): ArticleType[] => {
    let sortedArticles = [...articles];

    if (sortOrder === 'recent') {
      sortedArticles.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOrder === 'like') {
      sortedArticles.sort((a, b) => b.likeCount - a.likeCount);
    }

    return sortedArticles;
  };

  useEffect(() => {
    if (articles && articles.length > 0) {
      setLoading(false);
    }
  }, [articles]);

  useEffect(() => {
    const sortedArticles = sortArticles(filteredArticles, sortOrder);
    setFilteredArticles(sortedArticles);

    setLoading(false);
  }, [sortOrder, articles]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
