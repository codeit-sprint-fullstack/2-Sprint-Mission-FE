/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import c from '@utils/constants';
import Image from 'next/image';
import { useState } from 'react';

const style = {
  searchBar: css`
    height: 4.2rem;
    border-radius: 12px;
    background-color: var(--gray-100);

    padding: 0.9rem 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    input {
      border: none;
      background-color: inherit;
      width: 100%;
      height: 100%;

      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.6rem;

      &::placeholder {
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2.6rem;
        color: var(--gray-400);
      }

      &:focus {
        outline: 0;
        color: var(--gray-800);
      }
    }

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      width: 24.2rem;
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      width: 28.8rem;
    }
  `,
};

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = e => setSearchQuery(e.target.value);

  const handleSearch = e => {
    if (e.key === 'Enter') onSearch(searchQuery);
  };

  return (
    <div id="searchBar" css={style.searchBar}>
      <label htmlFor="search">
        <Image src="/Image/ic_search.png" alt="searchIcon" width={24} height={24} />
      </label>
      <input
        id="search"
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearch}
      />
    </div>
  );
}
