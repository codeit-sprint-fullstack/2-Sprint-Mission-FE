import styles from './ProductHeader.module.css';
import Search from '../Common/Search';
import Dropdown from '../Common/Dropdown';
import Link from 'next/link';

export default function ProductHeader({
  keyword,
  onSearch,
  onKeyDown,
  sortOrder,
  setSortOrder
}) {
  return (
    <div className={styles.wrapper}>
      <h1>판매 중인 상품</h1>
      <div className={styles.service}>
        <Search
          keyword={keyword}
          onSearch={onSearch}
          onKeyDown={onKeyDown}
          width={'32.5rem'}
        />
        <button>
          <Link href="/items/register">상품 등록하기</Link>
        </button>
        <Dropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
    </div>
  );
}
