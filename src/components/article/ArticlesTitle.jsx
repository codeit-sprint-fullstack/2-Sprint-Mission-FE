/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SortOrderSelect from '../SortOrderSelect';
import SearchBar from '../SearchBar';
import Link from 'next/link';

const style = {
  titleAndButton: css`
    margin-bottom: 2.4rem;
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    button {
      width: 9.6rem;
      height: 4.4rem;
      padding: 1.2rem 2.3rem;
      border-radius: 8px;

      font-size: 1.6rem;
      font-weight: 600;
    }
  `,
  searchAndSort: css`
    height: 4.2rem;
    display: flex;
    justify-content: space-between;
    gap: 1.6rem;

    #searchBarWrapper {
      flex-grow: 1;
    }
  `,
};

export default function ArticlesTitle({ onSearch, onSortOrderChange }) {
  return (
    <div id="articlesTitle">
      <div id="titleAndButton" css={style.titleAndButton}>
        <h2>게시글</h2>
        <Link href="/articles/post">
          <button type="button" className="button">
            글쓰기
          </button>
        </Link>
      </div>
      <div id="searchAndSort" css={style.searchAndSort}>
        <div id="searchBarWrapper">
          <SearchBar onSearch={onSearch} />
        </div>
        <SortOrderSelect onChange={onSortOrderChange} />
      </div>
    </div>
  );
}
