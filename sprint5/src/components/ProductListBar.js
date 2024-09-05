import searchIcon from '../images/ic_search.png';
import '../css/ProductListBar.css';

export default function ProductListBar() {
  return (
    <section>
      <div className="ProductBar">
        <div className="ProductBarInfo">
          <h2>판매 중인 상품</h2>
          <div className="side">
            <div className="seach-bar">
              <img className="search-img" src={searchIcon} />
              <input id="search" placeholder="검색할 상품을 입력해주세요" />
            </div>
            <button className="product-add">상품 등록하기</button>
          </div>
        </div>
      </div>
    </section>
  );
}
