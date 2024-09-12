import searchIcon from '../images/ic_search.png';
import '../css/ProductListBar.css';
import OrderMenu from './OrderMenu';

export default function ProductListBar({ keyword, onSearch, value, onChange }) {
  return (
    <section>
      <div className="product-bar">
        <div className="product-bar-info">
          <h1 className="product-list-title">판매 중인 상품</h1>
          <div className="search-bar">
            <img className="search-img" src={searchIcon} />
            <input
              className="search-input"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={keyword}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button className="product-add">
            <a href="/registration">상품 등록하기</a>
          </button>
          <OrderMenu className="order-menu" />
        </div>
      </div>
    </section>
  );
}
