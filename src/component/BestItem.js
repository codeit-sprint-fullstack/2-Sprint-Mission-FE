import '../css/BestItem.css';
import { getProductList } from '../api/ProductService';
import { useState, useEffect } from 'react';

export default function BestItem() {
  const [products, setProducts] = useState([]);

  const handleGetProductList = async () => {
    const productList = await getProductList({ pageSize: 10 });
    if (productList) {
      const sortedProductList = productList.list.sort((a, b) => b.favoriteCount - a.favoriteCount).slice(0, 4);
      setProducts(sortedProductList);
      
    } else {
      console.log('상품 목록을 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    handleGetProductList();
  }, []);

  return (
    <div className='best-section '>
      <p className='best-title'>베스트 상품</p>
      <div className='best-item'>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className='item'>
              <img className='img' src={product.images} alt={product.name} />
              <p className='name'>{product.name}</p>
              <p className='price'>{product.price}원</p>
              <p className='favoriteCount'>♡ {product.favoriteCount}</p>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p> 
        )}
      </div>
    </div>
  );
}
