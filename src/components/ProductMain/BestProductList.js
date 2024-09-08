import { useEffect, useState } from 'react';
import { getProductList } from '../../api/ProductService';
import ProductItem from './ProductItem';
import './BestProductList.css';

function BestProductList() {
  const [bestProducts, setBestProducts] = useState([]);
  const [error, setError] = useState(null);

  // 초기값을 현재 창 너비에 따라 설정
  const [maxItems, setMaxItems] = useState(() => {
    if (window.innerWidth >= 1200) {
      return 4; // Desktop
    } else if (window.innerWidth >= 744) {
      return 2; // Tablet
    } else {
      return 1; // Mobile
    }
  });

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

  if (error) {
    return <div className="error-message">{error}</div>;
  }


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
