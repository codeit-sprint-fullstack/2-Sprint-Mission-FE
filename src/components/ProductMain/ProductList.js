import { useEffect, useState } from 'react';
import { getProductList } from '../../api/ProductService';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import sortIcon from '../../assets/images/btn_sort.png'; // 소트 이미지 임포트
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [maxItems, setMaxItems] = useState(10);
  const [isSortMenuVisible, setSortMenuVisible] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 743); 
  const [sortOption, setSortOption] = useState('recent'); 
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductList(currentPage, maxItems, sortOption);
        setProducts(productList.list);
        console.log(productList);
        setTotalPages(Math.ceil(productList.totalCount / maxItems));
      } catch (e) {
        setError('판매중인 상품을 불러오는 데 실패하였습니다.');
      }
    };
    fetchProducts();
  }, [maxItems, sortOption, currentPage]);

  const toggleSortMenu = () => {
    setSortMenuVisible((prev) => !prev);
  };
  
  const handleSortOptionClick = (option) => {
    console.log(`Selected sort option: ${option}`); // 선택된 옵션 로그 출력
    setSortOption(option);
    setSortMenuVisible(false); // 메뉴 닫기
    console.log(`Sort menu visibility: ${false}`); // 메뉴 닫힘 상태 로그 출력
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
            {/* 팝업 메뉴가 보일 때만 표시 */}
            {isSortMenuVisible && (
              <div
                className={`sort-popup ${isSortMenuVisible ? 'visible' : ''}`}
                onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 중지 (한번더 클릭되서 다시 보이게 되는 듯)
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
      {/* Pagination 컴포넌트 사용 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
  
}

export default ProductList;
