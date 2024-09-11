import React, { useState, useEffect } from 'react';
import useProducts from '../hooks/useProducts';
import ProductCard from './ProductCard';
import './BestProductList.css';

const getPageSize = () => {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 4; 
  } else if (width >= 744) {
    return 2;
  } else {
    return 1;
  }
};

const BestProductList = () => {
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { products, loading } = useProducts(1, pageSize, 'favorite'); // 좋아요 순으로 정렬

  if (loading) return <div>Loading...</div>;

  return (
    <div className="best-product-list">
      <div className="product-grid">
        <h2>베스트 상품</h2>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestProductList;
