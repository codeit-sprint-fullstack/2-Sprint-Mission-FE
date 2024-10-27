/** @jsxImportSource @emotion/react */
import { useViewport } from '@/src/contexts/ViewportContext';
import useAsync from '@/src/hooks/useAsync';
import { getArticles } from '@/src/utils/api';
import c from '@/src/utils/constants';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Article from './Article';
import Link from 'next/link';

const style = {
  BestArticles: css`
    height: 21.7rem;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 2.4rem;
    }

    #BestArticleList {
      display: flex;
      gap: 2.4rem;
    }
  `,
};

export default function BestArticles() {
  const viewport = useViewport();
  const getArticlesAsync = useAsync(getArticles);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function handleLoadArticles() {
      const data = await getArticlesAsync({
        page: 1,
        pageSize: c.BEST_ARTICLE_PAGE_SIZE[viewport],
      });
      if (!data) return null;

      setArticles(data.list);
    }
    handleLoadArticles();
  }, [viewport, getArticlesAsync]);

  return (
    <div id="BestArticles" css={style.BestArticles}>
      <h2>베스트 게시글</h2>
      <div id="BestArticleList">
        {articles?.map(article => {
          return (
            <Link href={`/articles/${article.id}`} key={article.id}>
              <Article item={article} key={article.id} best />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
