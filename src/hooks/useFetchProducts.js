import { useEffect, useState } from 'react';
import { getProductList } from '../api/ProductService';

const useFetchProducts = (initialPage = 1, maxItems = 10, initialSortOption = 'recent') => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0); // 총 아이템 개수를 저장
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productList = await getProductList(currentPage, maxItems, sortOption);
        console.log('Fetched products', productList.list);
        setProducts(productList.list || []);
        setTotalCount(productList.totalCount || 0); // 총 개수를 설정
      } catch (e) {
        console.log(e.message);
        setError('상품을 불러오는 데 실패하였습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, maxItems, sortOption]);

  return {
    products,
    error,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    totalCount, // 총 개수를 반환
    isLoading
  };
};

export default useFetchProducts;
