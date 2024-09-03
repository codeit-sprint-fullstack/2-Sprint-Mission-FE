import '../css/market.css';
import { useCallback, useEffect, useState } from 'react';
import BestProducts from './BestProducts';
import Header from './Header';
import ProductsOnSale from './ProductsOnSale';
import Footer from './Footer';
import { getProducts } from '../api';
import useAsync from '../hooks/useAsync';
import { SORT_ORDER } from './SortOrderSelect';
import Modal from './Modal';
import { useViewport } from '../contexts/ViewportContext';

const BEST_ITEM_PAGE_SIZE = Object.freeze({
  PC: 4,
  TABLET: 2,
  MOBILE: 1
});
export const ITEM_PAGE_SIZE = Object.freeze({
  PC: 10,
  TABLET: 6,
  MOBILE: 4
});

function App() {
  const viewport = useViewport();
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.RECENT);
  const [searchQuery, setSearchQuery] = useState('');
  const [now, setNow] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, err, getProductsAsync] = useAsync(getProducts);

  const handleLoadBestItem = useCallback(
    async (params) => {
      const data = await getProductsAsync(params);
      if (!data) return;

      setBestItems(data.list);
    },
    [getProductsAsync]
  );
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
    handleLoadBestItem({
      page: 1,
      pageSize: BEST_ITEM_PAGE_SIZE[viewport],
      orderBy: SORT_ORDER.FAVORITE
    });
    handleLoadItem({
      page: now,
      pageSize: ITEM_PAGE_SIZE[viewport],
      orderBy: sortOrder,
      keyword: searchQuery
    });
  }, [
    viewport,
    now,
    sortOrder,
    searchQuery,
    handleLoadBestItem,
    handleLoadItem
  ]);

  return (
    <>
      <Header />
      <main>
        <BestProducts items={bestItems} />
        <ProductsOnSale
          items={items}
          totalCount={totalCount}
          onSearch={handleSearch}
          onSortOrderChange={handleSortOrderChange}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
      {/* {isLoading && <Modal message="로딩 중입니다." btn={false} />} */}
      {err && <Modal message={err.message} />}
    </>
  );
}

export default App;
