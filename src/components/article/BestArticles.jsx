/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import Article from '@components/article/Article';
import { useViewport } from '@contexts/ViewportProvider';
import useOwnQuery from '@hooks/useOwnQuery';
import { getArticles } from '@utils/api';
import c from '@utils/constants';

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
  const [articles, setArticles] = useState([]);

  const getBestArticlesQuery = useOwnQuery({
    queryFn: _ =>
      getArticles({
        page: 1,
        pageSize: c.BEST_ARTICLE_PAGE_SIZE[viewport],
      }),
    queryKey: ['bestArticles', viewport],
    onSuccess: result => setArticles(result.list),
  });

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
