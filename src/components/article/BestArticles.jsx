/** @jsxImportSource @emotion/react */
import Article from '@components/article/Article';
import { useViewport } from '@contexts/ViewportProvider';
import { css } from '@emotion/react';
import useAsync from '@hooks/useAsync';
import { getArticles } from '@utils/api';
import c from '@utils/constants';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    console.log(articles);
  }, [viewport, getArticlesAsync]);

  return (
    <div id="BestArticles" css={style.BestArticles}>
      <h2>베스트 게시글</h2>
      <div id="BestArticleList">
        {articles?.map(article => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <Article item={article} key={article.id} best />
          </Link>
        ))}
      </div>
    </div>
  );
}
