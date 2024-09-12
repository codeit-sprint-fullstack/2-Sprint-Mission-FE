import style from './css/ProductOnSaleTitle.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SortOrderSelect from './SortOrderSelect.js';
import { useViewport, VIEWPORT } from '../contexts/ViewportContext.js';
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

  const registBtn = (
    <Link to="/registration">
      <button className={`${style['regist-button']}`}>상품 등록하기</button>
    </Link>
  );
  const searchQry = (
    <div className={`${style['search-query']}`}>
      <label htmlFor="search">
        <img src={searchIcon} alt="searchIcon" />
      </label>
      <input
        id="search"
        type="text"
        className={`${style['search-query-input']}`}
        placeholder="검색할 상품을 입력해주세요"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearch}
      />
    </div>
  );
  const sortOrderSlct = <SortOrderSelect onChange={onSortOrderChange} />;

  return viewport === VIEWPORT.MOBILE ? (
    <div id={`${style.productOnSaleTitle}`}>
      <h3>판매 중인 상품</h3>
      {registBtn}
      {searchQry}
      {sortOrderSlct}
    </div>
  ) : (
    <div id={`${style.productOnSaleTitle}`}>
      <h3>판매 중인 상품</h3>
      {searchQry}
      {registBtn}
      {sortOrderSlct}
    </div>
  );
}

export default ProductOnSaleTitle;
