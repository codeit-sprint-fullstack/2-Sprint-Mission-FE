/** @jsxImportSource @emotion/react */
import BestArticles from '@/src/components/article/BestArticles';
import Articles from '@/src/components/article/Articles';
import { css } from '@emotion/react';
import DropdownProvider from '@/src/contexts/DropdownContext';

const style = {
  freeBoard: css`
    margin: 0 auto;
    min-height: calc(var(--adjust-vh));
    padding-top: 2.4rem;
  `,
  bestArticlesWrapper: css`
    margin-bottom: 4rem;
  `,
  articlesWrapper: css`
    margin-top: 4rem;
    margin-bottom: 2.4rem;
  `,
};

export default function FreeBoard() {
  return (
    <div id="freeBoard" css={style.freeBoard}>
      <div id="bestArticlesWrapper" css={style.bestArticlesWrapper}>
        <BestArticles />
      </div>
      <div id="articlesWrapper" css={style.articlesWrapper}>
        <DropdownProvider>
          <Articles />
        </DropdownProvider>
      </div>
    </div>
  );
}
