import styles from '../css/ProductList.module.css';
import { useState } from 'react';
import useQuery from '../hooks/useQuery';
import { getProductList } from '../api';
import Pagination from './Pagination';
import ProductListBar from './ProductListBar';
import useResize from '../hooks/useResize';
import { SortProvider, useSort } from '../contexts/SortContext';
import ProductCard from './ProductCard';

function ProductListContent() {
  const { sortOrder } = useSort();
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = useResize();

  const fetchProductList = () =>
    getProductList({
      page: currentPage,
      pageSize,
      order: sortOrder,
      keyword
    });

  const [data, isLoading, error] = useQuery(fetchProductList);

  // 조건부 렌더링 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data) return <div>No data found</div>;

  // 데이터 정렬 및 필터링
  const sortedItems = data.sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  //   if (sortOrder === 'favorite') {
  //     return b.favoriteCount - a.favoriteCount;
  //   }
  //   return 0;
  // });

  const filteredItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className={styles.layout}>
      <ProductListBar keyword={keyword} onSearch={setKeyword} />
      <div className={styles.list}>
        {currentItems.map((item) => (
          <div key={item.id}>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default function ProductList() {
  return (
    <SortProvider>
      <ProductListContent />
    </SortProvider>
  );
}
