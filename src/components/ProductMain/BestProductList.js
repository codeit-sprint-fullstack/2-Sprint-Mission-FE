import React, { useEffect, useState } from 'react';
import { getProductList } from '../../api/ProductService';
import ProductItem from './ProductItem';
import './BestProductList.css';

function BestProductList() {
  const [bestProducts, setBestProducts] = useState([]);
  const [error, setError] = useState(null);
  const [maxItems, setMaxItems] = useState(4); // 기본값: Desktop에서 4개

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setMaxItems(4); // Desktop: 4개        
      }
      else if (window.innerWidth >= 744) {
        setMaxItems(2); // Tablet: 2개
      } else {
        setMaxItems(1); // Mobile: 1개
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 실행 시 호출

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const productList = await getProductList(1, maxItems, 'favorite'); // maxItems만큼만 가져옴
        setBestProducts(productList.list); 
        console.log(productList.list); 
      } catch(e) {
        setError('베스트 상품을 불러오는 데 실패하였습니다.');
      }
    };
    fetchBestProducts();
  }, [maxItems]); // maxItems가 변경될 때마다 호출

  if (error) return (
    <div>{error}</div>
  );

  return (
    <div className="product-list-container">
      <h3 className="product-section-title">베스트 상품</h3>
      <div className="product-grid">
        {bestProducts.map((product) => (
          <ProductItem key={product.id} product={product} type="best" />
        ))}
      </div>
    </div>
  );
}

export default BestProductList;
