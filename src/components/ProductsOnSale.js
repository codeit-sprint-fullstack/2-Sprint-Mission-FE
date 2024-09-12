import style from './css/ProductsOnSale.module.css';
import { useCallback, useEffect, useState } from 'react';
import ProductCard from './ProductCard.js';
import Pagination from './Pagination.js';
import ProductOnSaleTitle from './ProductOnSaleTitle.js';
import useAsync from '../hooks/useAsync.js';
import { getProducts } from '../api.js';
import { useViewport } from '../contexts/ViewportContext.js';
import { SORT_ORDER } from './SortOrderSelect.js';

export const ITEM_PAGE_SIZE = Object.freeze({
  PC: 10,
  TABLET: 6,
  MOBILE: 4
});

function ProductsOnSale() {
  const viewport = useViewport();
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [now, setNow] = useState(1);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.RECENT);
  const [searchQuery, setSearchQuery] = useState('');
  const getProductsAsync = useAsync(getProducts);

  const handleLoadItem = useCallback(
    async (params) => {
      const data = await getProductsAsync(params);
      if (!data) return;

      setItems(data.list);
      setTotalCount(data.totalCount);
      setNow(params.page);
    },
    [getProductsAsync]
  );
  const handleSearch = (query) => setSearchQuery(query);
  const handleSortOrderChange = (order) => setSortOrder(order);
  const handlePageChange = useCallback((p) => setNow(p), []);

  useEffect(() => {
    handleLoadItem({
      page: now,
      pageSize: ITEM_PAGE_SIZE[viewport],
      orderBy: sortOrder,
      keyword: searchQuery
    });
  }, [viewport, now, sortOrder, searchQuery, handleLoadItem]);

  return (
    <section id={`${style.productOnSale}`}>
      <ProductOnSaleTitle
        onSearch={handleSearch}
        onSortOrderChange={handleSortOrderChange}
      />
      <div id={`${style.productOnSaleItems}`}>
        {items.map((item) => {
          return (
            <ProductCard
              classNames={`${style.productOnSale}`}
              item={item}
              key={item.id}
            />
          );
        })}
      </div>
      <div id={`${style.paginationWrapper}`}>
        <Pagination totalCount={totalCount} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}

export default ProductsOnSale;
