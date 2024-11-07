/** @jsxImportSource @emotion/react */
import SearchBar from '@components/SearchBar';
import SortOrderSelect from '@components/SortOrderSelect';
import { useViewport } from '@contexts/ViewportProvider';
import { css } from '@emotion/react';
import c from '@utils/constants';
import Link from 'next/link';

const style = {
  productOnSaleTitle: css`
    width: 120rem;
    height: 4.2rem;

    display: grid;
    gap: 1.2rem;
    grid-template-columns: 1fr 325px 133px 130px;

    h2 {
      font-weight: 700;
      font-size: 2rem;
      line-height: 3.2rem;
      color: var(--gray-900);
    }

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      min-width: 69.5rem;
      max-width: calc(100vw - 4.8rem);

      grid-template-columns: 1fr 242px 133px 130px;
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      width: 34.4rem;
      height: 9.2rem;

      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, auto);
      column-gap: 1.4rem;
      row-gap: 0.8rem;
    }
  `,
  registButton: css`
    height: 4.2rem;
    background-color: var(--Primary-100);
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.6rem;
    color: var(--gray-100);
    padding: 1.2rem 2.3rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      transform: translateX(-6.8rem);
    }
  `,
  searchBarWrapper: css`
    width: 32.5rem;
  `,
};

export default function ProductOnSaleTitle({ onSearch }) {
  const viewport = useViewport();

  const registBtn = (
    <Link href="/items/registration">
      <button id="registButton" css={style.registButton}>
        상품 등록하기
      </button>
    </Link>
  );
  const searchBar = (
    <div id="searchBarWrapper" css={style.searchBarWrapper}>
      <SearchBar onSearch={onSearch} />
    </div>
  );

  return viewport === c.VIEWPORT.MOBILE ? (
    <div css={style.productOnSaleTitle}>
      <h2>판매 중인 상품</h2>
      {registBtn}
      {searchBar}
      {<SortOrderSelect />}
    </div>
  ) : (
    <div css={style.productOnSaleTitle}>
      <h2>판매 중인 상품</h2>
      {searchBar}
      {registBtn}
      {<SortOrderSelect />}
    </div>
  );
}
