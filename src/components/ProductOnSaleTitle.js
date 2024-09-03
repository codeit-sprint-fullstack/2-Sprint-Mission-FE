import '../css/ProductOnSaleTitle.css';
import { useState } from 'react';
import SortOrderSelect from './SortOrderSelect';
import { useViewport, VIEWPORT } from '../contexts/ViewportContext';

function ProductOnSaleTitle({ onSearch, onSortOrderChange }) {
  const viewport = useViewport();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = (e) => {
    if (e.key === 'Enter') onSearch(searchQuery);
  };

  return viewport === VIEWPORT.MOBILE ? (
    <div id="productOnSaleTitle">
      <h3>판매 중인 상품</h3>
      <button className="regist-button">상품 등록하기</button>
      <input
        type="text"
        className="search-query"
        placeholder="검색할 상품을 입력해주세요"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearch}
      />
      <SortOrderSelect onChange={onSortOrderChange} />
    </div>
  ) : (
    <div id="productOnSaleTitle">
      <h3>판매 중인 상품</h3>
      <input
        type="text"
        className="search-query"
        placeholder="검색할 상품을 입력해주세요"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearch}
      />
      <button className="regist-button">상품 등록하기</button>
      <SortOrderSelect onChange={onSortOrderChange} />
    </div>
  );
}

export default ProductOnSaleTitle;
