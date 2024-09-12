import { useState, useEffect } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import sortIcon from '../../assets/images/btn_sort.png'; 
import './ProductList.css';

function ProductList() {
  const [maxItems, setMaxItems] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 743);
  const [isSortMenuVisible, setSortMenuVisible] = useState(false);

  const {
    products,
    error,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    totalCount,           // totalCount 가져오기
  } = useFetchProducts(1, maxItems, 'recent');

  // totalCount를 사용하여 totalPages 계산
  const totalPages = Math.ceil(totalCount / maxItems); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743);
      if (window.innerWidth >= 1200) {
        setMaxItems(10);
      } else if (window.innerWidth >= 744) {
        setMaxItems(6);
      } else {
        setMaxItems(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <div className="product-toolbar">
        <h3 className="product-section-title">판매 중인 상품</h3>
        <input
          type="text"
          className="product-search"
          placeholder="검색할 상품을 입력해 주세요"
        />
        <button className="product-register">상품 등록하기</button>
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
                  <div className="sort-option" onClick={() => handleSortOptionClick('favorite')}>
                    좋아요순
                  </div>
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
            <option value="favorite">좋아요순</option>
          </select>
        )}
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} type="" />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default ProductList;