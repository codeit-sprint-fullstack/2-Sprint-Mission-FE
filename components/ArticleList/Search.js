import styles from './Search.module.css';
import Image from 'next/image';

export default function Search({ keyword, onSearch, onKeyDown }) {
  return (
    <div className={styles.search}>
      <Image
        className={styles.icon}
        src="/images/ic_search.png"
        width={15}
        height={15}
        alt="검색 아이콘"
      />
      <input
        className={styles.input}
        type="text"
        placeholder="검색할 게시글을 입력해주세요"
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
