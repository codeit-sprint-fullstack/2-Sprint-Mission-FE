/** @jsxImportSource @emotion/react */
import ProductsOnSale from '@components/product/ProductsOnSale';
import DropdownProvider from '@contexts/DropdownProvider';
import { css } from '@emotion/react';
import c from '@utils/constants';

const style = {
  itemsPage: css`
    padding-top: 2.4rem;
    padding-bottom: 14rem;

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      padding-right: 2.4rem;
      padding-left: 2.4rem;
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      padding-right: 1.6rem;
      padding-left: 1.6rem;
    }
  `,
  bestProductWrapper: css`
    margin: 2.4rem auto 4rem auto;

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      max-width: 36rem;
    }
  `,
};

export default function ItemsPage() {
  return (
    <div id="items" css={style.itemsPage}>
      {/* <div css={style.bestProductWrapper}>
          <BestProducts />
        </div> */}
      <DropdownProvider>
        <ProductsOnSale />
      </DropdownProvider>
    </div>
  );
}
