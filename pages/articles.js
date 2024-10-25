import BestArticles from '@/components/BestArticles';
import style from '../styles/Article.module.css';
import Search from '@/components/Search';
import Sort from '@/components/Sort';
import ArticleList from '@/components/ArticleList';
import { getArticleList } from '@/pages/api/ArticleService';
import { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [search, setSearch ] = useState("");
  const [order, setOrder] = useState("favorite");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const pageSize = 10;
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    const fetchBestArticles = async () => {
      const { data: bestArticleList } = await getArticleList({
        orderBy: "favorite",
        pageSize: 3,
        page: 0,
      });
      setBestArticles(bestArticleList);
      console.log("Best Articles:", bestArticleList);  // 콘솔에 데이터 확인
    };

    fetchBestArticles();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data: articleList, totalCount } = await getArticleList({
        orderBy: order,
        pageSize: pageSize,
        page: currentPage - 1,
        search: search,
      });
      setArticles(articleList);
      setTotalCount(totalCount);
      console.log("Fetched Articles:", articleList);  // 콘솔에 데이터 확인
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
          <button className={style.articleBtn}>글쓰기</button>
        </div>
        <div className={style.searchSortGroup}>
            <Search className={style.search} setSearch={setSearch} />
            <Sort pageSize={pageSize} order={order} setOrder={setOrder} setCurrentPage={setCurrentPage} setIsToggle={setIsToggle} isToggle={isToggle}  />
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
