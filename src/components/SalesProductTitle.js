import { Link } from 'react-router-dom'
import SortOrder from "./SortOrder.js";
import styles from './SalesProductTitle.module.css'
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
    <div className={styles.salesProductTitle}>
      <h1 className={styles.title}>판매 중인 상품</h1>
      <div className={styles.searchArea}>
        <img src={searchIcon} alt='searchIcon'/> 
        <input
        className={styles.searchInputArea}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        />
      </div>
      <Link to='/registration' className={styles.registLink}><button className={styles.registButton}>상품 등록하기</button></Link>
      <SortOrder className={styles.SortOrder} onChange={onSortOrderChange} />
    </div>
  )
}