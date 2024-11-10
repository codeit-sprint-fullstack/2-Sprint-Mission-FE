/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import PaginationBar from '@components/PaginationBar';
import Article from '@components/article/Article';
import ArticlesTitle from '@components/article/ArticlesTitle';
import { useDropdownItem } from '@contexts/DropdownProvider';
import { useViewport } from '@contexts/ViewportProvider';
import useOwnQuery from '@hooks/useOwnQuery';
import { getArticles } from '@utils/api';
import c from '@utils/constants';

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
  const [now, setNow] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const data = useOwnQuery({
    queryFn: () =>
      getArticles({
        page: now,
        pageSize: c.ARTICLE_PAGE_SIZE[viewport],
        orderBy: sortOrder,
        keyword: searchQuery,
      }),
    queryKey: ['articles', now, sortOrder, searchQuery, viewport],
    onSuccess: result => {
      setArticles(result.list);
      setTotalCount(result.totalCount);
    },
  });

  const handleSearch = query => setSearchQuery(query);
  const handlePageChange = useCallback(p => setNow(p), []);

  return (
    <div id="articles" css={style.articles}>
      <div id="articlesTitleWrapper" css={style.articlesTitleWrapper}>
        <ArticlesTitle onSearch={handleSearch} />
      </div>
      <div id="articleList" css={style.articleList}>
        {articles?.map(article => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <Article item={article} key={article.id} />
          </Link>
        ))}
        <PaginationBar totalCount={totalCount} pageSize={c.ARTICLE_PAGE_SIZE[viewport]} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
