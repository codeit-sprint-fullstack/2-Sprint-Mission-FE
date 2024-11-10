import { useEffect, useState } from 'react';
import { useProductList } from '@/lib/hooks/useProductHooks';
import useMaxItems from '@/hooks/useMaxItems';
import SearchBar from '@/components/Common/SearchBar';
import Dropdown from '@/components/Common/Dropdown';
import Pagination from '@/components/Common/Pagination';
import styles from './ProductList.module.css';
import Link from 'next/link';
import ProductItem from './ProductItem';
import { useQueryClient } from '@tanstack/react-query';
import { getProductList } from '@/lib/api/ProductService';

export default function ProductList() {
  const maxItems = useMaxItems("productCount"); 
  const [sortOrder, setSortOrder] = useState('recent');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  // useProductList 훅을 호출하여 제품 목록 데이터를 가져옵니다.
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
  } = useProductList(currentPage, maxItems, sortOrder, searchKeyword);

  const products = data?.list || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / maxItems);

  const handleDropdownChange = (name, value) => {
    setSortOrder(value);
    setCurrentPage(1); // 정렬 변경 시 페이지 초기화
  };

  const handleSearchChange = (searchText) => {
    setSearchKeyword(searchText);
    setCurrentPage(1);
  };

  // 다음 페이지를 미리 가져오기 위한 useEffect
  useEffect(() => {
    if (!isPreviousData && currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["productList", currentPage + 1, maxItems, sortOrder, searchKeyword],
        queryFn: () => getProductList({ page: currentPage + 1, pageSize: maxItems, orderBy: sortOrder, keyword: searchKeyword }),
      });
    }
  }, [isPreviousData, currentPage, totalPages, queryClient, maxItems, sortOrder, searchKeyword]);

  return (
    <div className={styles['product-list-container']}>
      <div className={styles['product-toolbar']}>
        <h2 className={styles['product-section-title']}>판매중인 상품</h2>
        <div className={styles['product-search-container']}>
          <SearchBar initialValue={searchKeyword} onSearch={handleSearchChange} />
        </div>
        <Link href="/items/registration" className={styles['product-register']}>
          상품 등록하기
        </Link>
        <div className={styles['product-sort-bt']}>
          <Dropdown
            className={styles.dropdown}
            name="sortOrder"
            value={sortOrder}
            options={[
              { label: '최신순', value: 'recent' },
              { label: '좋아요 순', value: 'favorite' },
            ]}
            onChange={handleDropdownChange}
          />
        </div>
      </div>

      <div className={styles['product-grid']}>
        {isLoading ? (
          <div className={styles['loading-message']}>상품을 불러오는 중입니다...</div>
        ) : isError ? (
          <div className={styles['error-message']}>제품을 불러오는 데 문제가 발생했습니다.</div>
        ) : (
          products.map((product, index) => (
            <Link key={product.id} href={`/items/${product.id}`}>
              <ProductItem
                product={product}
                priority={index === 0 && window.scrollY === 0} // 스크롤이 상단일 때만 첫 번째 항목에 priority 전달
              />
            </Link>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        isPreviousData={isPreviousData}
      />
    </div>
  );
}
