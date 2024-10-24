import Image from 'next/image';
import magnifierIcon from '@/public/assets/ic_search.png';
import style from '@/styles/SearchBar.module.css';

export default function SearchBar({ onKeywordChange }) {
  return (
    <div className={style.searchBar}>
      <Image src={magnifierIcon} alt="magifier icon" />
      <input
        id="searchPostInput"
        className={style.searchInput}
        placeholder="검색할 상퓸을 입력해주세요"
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
  );
}
