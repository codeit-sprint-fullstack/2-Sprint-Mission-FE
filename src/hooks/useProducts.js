// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = (page = 1, pageSize = 10, orderBy = 'recent') => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);  // totalCount 상태 추가
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://panda-market-api.vercel.app/products', {
          params: { page, pageSize, orderBy }
        });

        if (response.data && Array.isArray(response.data.list)) {
          setProducts(response.data.list);
          setTotalCount(response.data.totalCount);  // totalCount 설정
        } else {
          setProducts([]);
          setTotalCount(0);  // 데이터가 없을 경우 totalCount를 0으로 설정
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setTotalCount(0);  // 에러가 발생했을 때도 totalCount를 0으로 설정
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page, pageSize, orderBy]);

  return { products, totalCount, loading };  // totalCount 반환
};

export default useProducts;
