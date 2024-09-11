import searchIcon from '../images/ic_search.png';
import '../css/ProductListBar.css';
import OrderMenu from './OrderMenu';
import { useState } from 'react';

export default function ProductListBar({ keyword, onSearch }) {
  const [order, setOrder] = useState('recent');

  return (
    <section>
      <div className="product-bar">
        <div className="product-bar-info">
          <h1 className="product-list-title">판매 중인 상품</h1>
          <div className="search-bar">
            <img className="search-img" src={searchIcon} />
            <input
              className="search-input"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={keyword}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button className="product-add">상품 등록하기</button>
          <OrderMenu className="order-menu" value={order} onChange={setOrder} />
        </div>
      </div>
    </section>
  );
}
