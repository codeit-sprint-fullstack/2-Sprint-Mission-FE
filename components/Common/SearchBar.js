import { useState } from 'react';
import Image from 'next/image';
import styles from './SearchBar.module.css';

export default function SearchBar({ initialValue = '', onSearch }) {
  const [searchText, setSearchText] = useState(initialValue);

  function handleInputChange(e) {
    setSearchText(e.target.value);
    onSearch(e.target.value); // 부모 컴포넌트로 검색어 전달
  }

  function clearSearch() {
    setSearchText('');
    onSearch(''); // 검색어를 초기화하고 부모 컴포넌트로 전달
  }

  return (
    <div className={styles.searchContainer}>
      {/* 검색 아이콘 */}
      {!searchText && (
        <div className={`${styles.iconLeft} ${styles.relative}`}>
          <div className={styles.iconWrapper}>
            <Image 
              src="/images/search/ic_search.svg" 
              alt="검색 아이콘"
              fill
            />
          </div>
        </div>
      )}

      {/* 검색 입력창 */}
      <input
        type="text"
        className={styles.inputField}
        name="q"
        value={searchText}
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleInputChange}
        style={{ paddingLeft: searchText ? '1.2rem' : '3.6rem' }}
      />

      {/* 클리어 아이콘과 검색 아이콘 */}
      {searchText && (
        <div className={styles.iconsRight}>
          <div className={styles.clearIcon} onClick={clearSearch}>
            <div className={styles.iconWrapper}>
              <Image
                src="/images/search/ic_clear.png"
                alt="클리어 아이콘"
                fill
                sizes='1.6rem'
              />
            </div>
          </div>
          <div className={styles.iconRight}>
            <div className={styles.iconWrapper}>
              <Image
                src="/images/search/ic_search.svg"
                alt="검색 아이콘"
                fill
                sizes='2.4rem'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
