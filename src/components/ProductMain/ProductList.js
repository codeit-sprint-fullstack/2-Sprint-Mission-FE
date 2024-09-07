import { useEffect, useState } from 'react';
import { getProductList } from '../../api/ProductService';
import ProductItem from './ProductItem';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [maxItems, setMaxItems] = useState(10);
  console.log('ProductList');
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 1200) {
        setMaxItems(10); 
      } else if (window.innerWidth >= 744) {
        setMaxItems(6);
      } else {
        setMaxItems(4);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);

  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductList(1, maxItems);
        setProducts(productList.list);
        console.log(productList.list);
      } catch(e) {
        setError('판매중인 상품을 불러오는 데 실패하였습니다.')
      }

    };
    fetchProducts();
  }, [maxItems]);

  if(error) return(
    <div>{error}</div>
  )

  return (
    <div className="product-list-container">
      <h3 className="product-section-title"> 판매 중인 상품</h3>
      <div className="product-grid">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} type="" />
        ))}
      </div>
    </div>
  )
}

export default ProductList;