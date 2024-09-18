import styles from '../css/ProductListBar.module.css';
import searchIcon from '../images/ic_search.png';
import OrderMenu from './OrderMenu';
import { Link } from 'react-router-dom';

export default function ProductListBar({ keyword, onSearch }) {
  return (
    <section>
      <div className={styles.bar}>
        <h1 className={styles.title}>판매 중인 상품</h1>
        <div className={styles.search}>
          <img className={styles.icon} src={searchIcon} />
          <input
            className={styles.input}
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={keyword}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button className={styles.add}>
          <Link to="/registration">상품 등록하기</Link>
        </button>
        <OrderMenu />
      </div>
    </section>
  );
}
