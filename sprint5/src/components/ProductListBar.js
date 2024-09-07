import searchIcon from '../images/ic_search.png';
import '../css/ProductListBar.css';
import OrderMenu from './OrderMenu';
import { useState } from 'react';

export default function ProductListBar({ keyword, onSearch, value, onChange }) {
  const [selectedValue, setSelectedValue] = useState('recent');

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
  };
  return (
    <section>
      <div className="ProductBar">
        <div className="ProductBarInfo">
          <h1 className="product-list-title">판매 중인 상품</h1>
          <div className="side">
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
            <OrderMenu value={value} onChange={onChange} />
          </div>
        </div>
      </div>
    </section>
  );
}
