import '../css/ItemList.css';
// import { getProductList } from '../api/ProductService';
// import { useState, useEffect } from 'react';

export default function ItemList({ products }) {
	// const [products, setProducts] = useState([]);

  // const handleGetProductList = async () => {
  //   const productList = await getProductList({ page:2, pageSize: 10 });
  //   if (productList) {
  //     const sortedProductList = productList.list.sort((a, b) => b.favoriteCount - a.favoriteCount);
  //     setProducts(sortedProductList);
	// 		console.log(sortedProductList);
  //   } else {
  //     console.log('상품 목록을 불러오는데 실패했습니다.');
  //   }
  // };

  // useEffect(() => {
  //   handleGetProductList();
  // }, []);

  return (
    // <div className="item-section">
      /* <div className='item-search'>
        <p className="item-title">판매 중인 상품</p>
        <input placeholder='검색할 상품을 입력해주세요'></input>
        <button>상품 등록하기</button>
      </div> */
			<div className='item-list'>
			{products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className='item'>
              <img className='item-img' src={product.images} alt={product.name} />
              <p className='item-name'>{product.name}</p>
              <p className='item-price'>{product.price}원</p>
              <p className='item-favoriteCount'>♡ {product.favoriteCount}</p>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p> 
        )}
			</div>
    // </div>
  );
}