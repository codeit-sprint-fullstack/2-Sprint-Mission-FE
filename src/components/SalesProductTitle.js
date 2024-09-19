import SortOrder from "./SortOrder";
import '../css/SalesProductTitle.css';
import { useState } from "react";
import searchIcon from '../image/ic_search.png'

export default function SalesProductTitle({ onSearchChange, onSortOrderChange }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchChange(searchText);
    }
  }

  return (
    <div className="salesProductTitle">
      <h1 className='title'>판매 중인 상품</h1>
      <div className="searchArea">
        <img src={searchIcon} alt='searchIcon'/> 
        <input
        className="searchInputArea"
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        ></input>
      </div>
      <button className="registButton">상품 등록하기</button>
      <SortOrder className="SortOrder" onChange={onSortOrderChange} />
    </div>
  )
}