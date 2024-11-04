import { useState, useEffect, useCallback } from 'react';
import { getProductList } from '@/lib/api/ProductService';
import SearchBar from '@/components/Common/SearchBar';
import Dropdown from '@/components/Common/Dropdown';
import styles from './ProductList.module.css';
import Link from 'next/link';
import ProductItem from './ProductItem';

const PRODUCT_COUNT = 10;
const MIN_LOADING_TIME = 500;

export default function ProductList({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('recent');
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    setShowLoading(false);
    const loadingTimeout = setTimeout(() => setShowLoading(true), MIN_LOADING_TIME);

    try {
      const response = await getProductList({ page: 1, pageSize: PRODUCT_COUNT, orderBy: sortOrder });
      const products = response.list;
      setProducts(products); 
    } catch (error) {
      console.error('제품을 가져오는데 실패했습니다:', error);
      setError('제품을 불러오는 데 문제가 발생했습니다.');
    } finally {
      clearTimeout(loadingTimeout);
      setLoading(false);
      setShowLoading(false);
    }
  }, [sortOrder]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  const handleDropdownChange = (name, value) => {
    setSortOrder(value);
  };

  const handleSearchChange = (searchText) => {
    setSearchKeyword(searchText);
  };

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
        {showLoading ? (
          <div className={styles['loading-message']}>상품을 불러오는 중입니다...</div>
        ) : (
          products.map((product) => (
            <Link key={product.id} href={`/items/${product.id}`} >
              <ProductItem product={product} />
            </Link>
          ))
        )}
      </div>
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}
