import BestArticles from '@/components/BestArticles';
import style from '../styles/Article.module.css';
import Search from '@/components/Search';
import Sort from '@/components/Sort';
import ArticleList from '@/components/ArticleList';
import { getArticleList } from '@/pages/api/ArticleService';
import { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

const mobileSize = 743;
const tabletSize = 1199;

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [search, setSearch ] = useState("");
  const [order, setOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < mobileSize) setPageSize(1); // 작은 화면
      else if (window.innerWidth < tabletSize) setPageSize(2); // 중간 화면
      else setPageSize(3); // 큰 화면
    };

    window.addEventListener('resize', updatePageSize);
    updatePageSize();  // 처음 로드 시에 호출

    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  useEffect(() => {
    const fetchBestArticles = async () => {
      const { data: bestArticleList } = await getArticleList({
        order: "favorite",
        pageSize: pageSize,
        page: 0,
      });
      setBestArticles(bestArticleList);
    };

    fetchBestArticles();
  }, [pageSize]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data: articleList, totalCount } = await getArticleList({
        order: order,
        pageSize: 10,
        page: currentPage - 1,
        search: search,
      });
      setArticles(articleList);
      setTotalCount(totalCount);
      // console.log("Fetched Articles:", articleList); 
    };

    fetchArticles();
  }, [order, currentPage, search]);

  return (
    <div className={style.top}>
      <div className={style.body}>
        <h1 className={style.articleTitle}>베스트 게시글</h1>
        <div>
          <BestArticles articles={bestArticles} />
        </div>
        <div className={style.titleBtnGroup}>
          <h1 className={style.articleTitle}>게시글</h1>
          <Link href='/post'>
            <button className={style.articleBtn}>글쓰기</button>
          </Link>
        </div>
        <div className={style.searchSortGroup}>
            <Search className={style.search} setSearch={setSearch} />
            <Sort 
              pageSize={pageSize} 
              order={order} setOrder={setOrder} 
              setCurrentPage={setCurrentPage} />
        </div>
        <div>
          <ArticleList articles={articles} />
        </div>
      </div>
      <Pagination
        className={style.Pagination}
        page={currentPage}
        setPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </div>
  );
}
