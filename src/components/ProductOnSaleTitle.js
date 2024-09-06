import '../css/ProductOnSaleTitle.css';
import { useState } from 'react';
import SortOrderSelect from './SortOrderSelect';
import { useViewport, VIEWPORT } from '../contexts/ViewportContext';
import searchIcon from '../Image/ic_search.svg';

function ProductOnSaleTitle({ onSearch, onSortOrderChange }) {
  const viewport = useViewport();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = (e) => {
    if (e.key === 'Enter') onSearch(searchQuery);
  };

  const registBtn = <button className="regist-button">상품 등록하기</button>;
  const searchQry = (
    <div className="search-query">
      <label htmlFor="search">
        <img src={searchIcon} alt="searchIcon" />
      </label>
      <input
        id="search"
        type="text"
        className="search-query-input"
        placeholder="검색할 상품을 입력해주세요"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearch}
      />
    </div>
  );
  const sortOrderSlct = <SortOrderSelect onChange={onSortOrderChange} />;

  return viewport === VIEWPORT.MOBILE ? (
    <div id="productOnSaleTitle">
      <h3>판매 중인 상품</h3>
      {registBtn}
      {searchQry}
      {sortOrderSlct}
    </div>
  ) : (
    <div id="productOnSaleTitle">
      <h3>판매 중인 상품</h3>
      {searchQry}
      {registBtn}
      {sortOrderSlct}
    </div>
  );
}

export default ProductOnSaleTitle;
