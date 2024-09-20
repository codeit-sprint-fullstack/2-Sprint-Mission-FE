import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchProducts from '../../hooks/useFetchProducts';
import useMaxitems from '../../hooks/useMaxItems';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import sortIcon from '../../assets/images/btn_sort.png'; 
import searchIcon from '../../assets/images/icon/ic_search.png';
import './ProductList.css';
import useIsMobile from '../../hooks/useIsMobile';

function ProductList() {
  const maxItems = useMaxitems();
  const isMobile = useIsMobile();
  const [isSortMenuVisible, setSortMenuVisible] = useState(false);
  const [searchKeyword, setSearchKeyowrd] = useState('');

  const {
    products,
    error,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    totalCount,          
    setSearch,
    showLoading,
  } = useFetchProducts(1, maxItems, 'recent');

  // totalCount를 사용하여 totalPages 계산
  const totalPages = Math.ceil(totalCount / maxItems); 

  const toggleSortMenu = () => {
    setSortMenuVisible((prev) => !prev);
  };

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setSortMenuVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchKeyowrd(event.target.value);
  }
  const handleSearchSubmit = () => {
    setSearch(searchKeyword);      // 검색어 설정
    setCurrentPage(1);
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleSearchSubmit();
    }
  }
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <div className="product-toolbar">
        <h3 className="product-section-title">판매 중인 상품</h3>
        <div className="product-search-container">
          <img src={searchIcon} alt="상품검색" className="search-icon" onClick={handleSearchSubmit} />
          <input
            type="text"
            className="product-search"
            placeholder="검색할 상품을 입력해 주세요"
            value={searchKeyword}
            onChange={handleSearchChange}  // 검색어 변경 이벤트 핸들러
            onKeyDown={handleKeyDown}      // Enter 키 이벤트 핸들러
          />
        </div>
        <Link to="/registration" className="product-register">상품 등록하기</Link>
        {isMobile ? (
          <>
            <button className="product-sort-btn" onClick={toggleSortMenu}>
              <img src={sortIcon} alt="정렬" className="sort-icon" />
              {isSortMenuVisible && (
                <div
                  className={`sort-popup ${isSortMenuVisible ? 'visible' : ''}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sort-option" onClick={() => handleSortOptionClick('recent')}>
                    최신순
                  </div>
                  {/* 
                  <div className="sort-option" onClick={() => handleSortOptionClick('favorite')}>
                    좋아요순
                  </div>
                  */}
                </div>
              )}
            </button>
          </>
        ) : (
          <select
            className="product-sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="recent">최신순</option>
            {/*<option value="favorite">좋아요순</option>*/}
          </select>
        )}
      </div>

      <div className="product-grid">
        {showLoading ? (
          <div className="loading-message">상품을 불러오는 중입니다...</div>
        ) : (
          products.map((product) => (
            <ProductItem key={product._id} product={product} type="" />
          ))
        )}
      </div>
      {!showLoading && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

export default ProductList;
