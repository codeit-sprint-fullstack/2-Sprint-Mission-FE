import { ChangeEvent } from 'react';
import styles from './Search.module.css';
import Image from 'next/image';

interface SearchProps {
  keyword: string;
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  width: string;
}

export default function Search({
  keyword,
  onSearch,
  onKeyDown,
  width
}: SearchProps) {
  return (
    <div className={styles.search} style={{ width: width }}>
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
