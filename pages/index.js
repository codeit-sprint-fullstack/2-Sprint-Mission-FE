import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import { getArticleList } from '@/lib/api/ArticleService';
import ArticleList from '@/components/ArticleList/ArticleList';
import BestArticleList from '@/components/BestArticleList/BestArticleList';
import Search from '@/components/ArticleList/Search';
import Dropdown from '@/components/ArticleList/Dropdown';
import ArticleHeader from '@/components/ArticleList/ArticleHeader';
import Pagination from '@/components/ArticleList/Pagination';
import useResize from '@/hooks/useResize';

export async function getServerSideProps() {
  try {
    const bestArticles = await getArticleList({
      page: 1,
      pageSize: 3,
      order: 'recent'
    });

    const articles = await getArticleList({
      page: 1,
      pageSize: 5,
      order: 'recent',
      keyword: ''
    });

    return {
      props: {
        articles,
        bestArticles
      }
    };
  } catch (err) {
    console.error('데이터를 불러오는 중 문제가 발생하였습니다.', err);
    throw new Error(
      '서버에서 데이터를 가져오는 중 문제가 발생했습니다.' + err.message
    );
  }
}

export default function Home({ articles, bestArticles: initialBestArticles }) {
  const [bestArticles, setBestArticles] = useState(initialBestArticles);
  const bestPageSize = useResize();
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  useEffect(() => {
    async function fetchBestArticles() {
      const res = await getArticleList({
        page: 1,
        pageSize: bestPageSize,
        order: 'recent'
      });
      setBestArticles(res);
    }
    fetchBestArticles();
  }, [bestPageSize]);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredArticles(filtered);
      setCurrentPage(1);
    }
  };

  const totalPages = Math.ceil(filteredArticles.length / pageSize);

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.wrapper}>
      <BestArticleList
        bestArticles={bestArticles}
        bestPageSize={bestPageSize}
      />
      <div className={styles.articles}>
        <ArticleHeader />
        <div className={styles[`article-search`]}>
          <Search
            keyword={keyword}
            onSearch={setKeyword}
            onKeyDown={handleSearch}
          />
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
