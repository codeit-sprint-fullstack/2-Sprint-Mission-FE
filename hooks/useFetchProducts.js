import { useEffect, useMemo, useRef, useState } from 'react';
import { getProductList } from '@/lib/api/ProductService';

// 작성하였으나 잘 동작되지 않아 잠시 보류
const useFetchProducts = (initialPage = 1, maxItems = 10, initialSortOption = 'recent', initialProducts = []) => {
  const [products, setProducts] = useState(initialProducts);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0); // 총 아이템 개수를 저장

  const [search, setSearch] = useState('');
  const [showLoading, setShowLoading] = useState(false); // 로딩 화면을 표시할지 여부

  //const initialSortOptionRef = useRef(initialSortOption); // useRef를 사용하여 initialSortOption 저장
  const initialSortOptionRef = useMemo(() => initialSortOption, [initialSortOption]);
  //const initialProductsLengthRef = useRef(initialProducts.length); // 의존성배열에 추가하면 무한루프 초래해서 useRef 사용
  const initialProductsLengthRef = useMemo(() => initialProducts.length, [initialProducts.length]);
  const MIN_LOADING_TIME = 500; // 최소 로딩 시간 : 로딩 화면 보여주기 

  useEffect(() => {
    const fetchProducts = async () => {
      const loadingTimeout = setTimeout(() => {
        setShowLoading(true); // 최소 로딩시간이 지나면 로딩 화면을 표시
      }, MIN_LOADING_TIME);

      try {
        const productList = await getProductList(currentPage, maxItems, sortOption, search);
        setProducts(productList.list || []);
        setTotalCount(productList.totalCount || 0); // 총 개수를 설정
      } catch (e) {
        console.log(e.message);
        setError('상품을 불러오는 데 실패하였습니다.');
      } finally {
        clearTimeout(loadingTimeout);
        setShowLoading(false);
      }
    };

    // API 요청을 통해 데이터를 가져오되, 초기 렌더링 시에는 initialProducts를 사용
    //if (initialProductsLengthRef === 0 || currentPage > 1 || search || sortOption !== initialSortOptionRef ) {
      fetchProducts();
    //}
  }, [currentPage, maxItems, sortOption, search]);

  return {
    products,
    error,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    totalCount, // 총 개수를 반환
    setSearch,
    showLoading,
  };
};

export default useFetchProducts;
