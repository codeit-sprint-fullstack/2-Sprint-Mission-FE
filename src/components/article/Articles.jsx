/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ArticlesTitle from './ArticlesTitle';
import c from '../../utils/constants';
import { useCallback, useEffect, useState } from 'react';
import { getArticles } from '@/src/utils/api';
import useAsync from '@/src/hooks/useAsync';
import { useViewport } from '@/src/contexts/ViewportContext';
import PaginationBar from '../PaginationBar';
import Article from './Article';
import Link from 'next/link';
import { useDropdownItem } from '../../contexts/DropdownContext';

const style = {
  articles: css`
    margin-bottom: 6rem;
  `,
  articlesTitleWrapper: css`
    margin-bottom: 2.4rem;
  `,
  articleList: css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
};

export default function Articles() {
  const viewport = useViewport();
  const { item: sortOrder = c.SORT_ORDER.RECENT } = useDropdownItem();
  const getArticlesAsync = useAsync(getArticles);
  const [now, setNow] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = query => setSearchQuery(query);
  const handlePageChange = useCallback(p => setNow(p), []);

  useEffect(() => {
    async function handleLoadArticles() {
      const data = await getArticlesAsync({
        page: now,
        pageSize: c.ARTICLE_PAGE_SIZE[viewport],
        orderBy: sortOrder,
        keyword: searchQuery,
      });
      if (!data) return null;

      setArticles(data.list);
      setTotalCount(data.totalCount);
      setNow(now);
    }
    handleLoadArticles();
  }, [viewport, now, sortOrder, searchQuery, getArticlesAsync]);

  return (
    <div id="articles" css={style.articles}>
      <div id="articlesTitleWrapper" css={style.articlesTitleWrapper}>
        <ArticlesTitle onSearch={handleSearch} />
      </div>
      <div id="articleList" css={style.articleList}>
        {articles?.map(article => {
          return (
            <Link href={`/articles/${article.id}`} key={article.id}>
              <Article item={article} key={article.id} />
            </Link>
          );
        })}
        <PaginationBar totalCount={totalCount} pageSize={c.ARTICLE_PAGE_SIZE[viewport]} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
