/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import PaginationBar from '@components/PaginationBar';
import ProductCard from '@components/product/ProductCard';
import ProductOnSaleTitle from '@components/product/ProductOnSaleTitle';
import { useDropdownItem } from '@contexts/DropdownProvider';
import { useViewport } from '@contexts/ViewportProvider';
import useOwnQuery from '@hooks/useOwnQuery';
import { getProducts } from '@utils/api';
import c from '@utils/constants';

const style = {
  productOnSale: css`
    margin: 0 auto;
  `,
  productOnSaleItems: css`
    height: 67.4rem;

    margin-top: 2.4rem;

    display: grid;
    align-items: center;
    justify-content: center;
    column-gap: 2.4rem;
    row-gap: 4rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      height: 82rem;

      column-gap: 1.6rem;
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      height: 67.4rem;

      margin-top: 1.6rem;

      column-gap: 0.8rem;
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  paginationWrapper: css`
    margin: 4.3rem auto 0;

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      margin-bottom: 16.5rem;
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      margin-bottom: 13.5rem;
    }
  `,
};

export default function ProductsOnSale() {
  const viewport = useViewport();
  const { item: sortOrder = c.SORT_ORDER.RECENT } = useDropdownItem();
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [now, setNow] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getProductsQuery = useOwnQuery({
    queryFn: _ =>
      getProducts({
        page: now,
        pageSize: c.PRODUCT_PAGE_SIZE[viewport],
        orderBy: sortOrder,
        keyword: searchQuery,
      }),
    queryKey: ['products', now, sortOrder, searchQuery, viewport],
    onSuccess: result => {
      setProducts(result.list);
      setTotalCount(result.totalCount);
    },
  });

  const handleSearch = query => setSearchQuery(query);
  const handlePageChange = useCallback(p => setNow(p), []);

  return (
    <section id="productOnSale" css={style.productOnSale}>
      <ProductOnSaleTitle onSearch={handleSearch} />
      <div css={style.productOnSaleItems}>
        {products.map(product => (
          <Link href={`/items/${product.id}`} key={product.id}>
            <ProductCard type="onSale" item={product} key={product.id} />
          </Link>
        ))}
      </div>
      <div css={style.paginationWrapper}>
        <PaginationBar totalCount={totalCount} pageSize={c.PRODUCT_PAGE_SIZE[viewport]} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}
