/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import ProductCard from '@components/product/ProductCard';
import { useViewport } from '@contexts/ViewportProvider';
import useAsync from '@hooks/useAsync';
import { getProducts } from '@utils/api';
import c from '@utils/constants';

const style = {
  bestProductsTitle: css`
    margin-bottom: 1.6rem;

    h2 {
      font-weight: 700;
      font-size: 2rem;
      line-height: 3.2rem;
      color: var(--gray-900);
    }

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      height: 43.4rem;

      gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  bestProductsItems: css`
    height: 37.8rem;

    display: grid;
    gap: 2.4rem;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      height: 48.2rem;

      grid-template-columns: 1fr;
    }
  `,
};

export default function BestProducts() {
  const viewport = useViewport();
  const [items, setItems] = useState([]);
  const getProductsAsync = useAsync(getProducts);

  useEffect(() => {
    async function handleLoadItem() {
      const data = await getProductsAsync({
        page: 1,
        pageSize: c.BEST_PRODUCT_PAGE_SIZE[viewport],
        orderBy: c.SORT_ORDER.LIKE,
      });
      if (!data) return;

      setItems(data.list);
    }

    handleLoadItem();
  }, [viewport, getProductsAsync]);

  return (
    <section id="bestProduct">
      <div css={style.bestProductsTitle}>
        <h2>베스트 상품</h2>
      </div>
      <div css={style.bestProductsItems}>
        {items.map(item => {
          return <ProductCard item={item} key={item.id} best />;
        })}
      </div>
    </section>
  );
}
