// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import useProducts from '../hooks/useProducts';
import ProductCard from './ProductCard';
import './ProductList.css';
import leftArrowImg from './img/arrow_left.svg';
import rightArrowImg from './img/arrow_right.svg';
import dropdownArrowImg from './img/ic_arrow_down.svg';
import dropdownSortImg from './img/ic_sort.svg';
import searchImg from './img/ic_search.svg';

const getPageSize = () => {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 10; // Desktop에서 10개의 아이템 (5열 x 2줄)
  } else if (width >= 744) {
    return 6; // Tablet에서 6개의 아이템 (3열 x 2줄)
  } else {
    return 4; // Mobile에서 4개의 아이템 (2열 x 2줄)
  }
};

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('recent');
  const [pageSize, setPageSize] = useState(getPageSize());
  const { products, totalCount, loading } = useProducts(page, pageSize, orderBy);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 743);  // 모바일 환경 확인

  const totalPages = Math.ceil(totalCount / pageSize);  // totalPages 계산

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
      setIsMobile(window.innerWidth <= 743);  // 화면 크기에 따라 모바일 상태 업데이트
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;
    let startPage = Math.max(1, page - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={page === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (value) => {
    setOrderBy(value);
    setDropdownOpen(false);
  };

  return (
    <div className="product-list">
      <div className="product-header">
        <h2>판매 중인 상품</h2>
        <div className="product-search">
          <img src={searchImg} alt="Search" />
          <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="product-search-input"
            />
        </div>
        <button className="product-create-button">상품 등록하기</button>
        <div className="custom-dropdown" onClick={toggleDropdown}>
          <div className="custom-dropdown-selected">
            {!isMobile && (orderBy === 'recent' ? '최신순' : '좋아요순')}
            <img src={isMobile ? dropdownSortImg : dropdownArrowImg} alt="Dropdown" className="dropdown-arrow" />
          </div>
          {dropdownOpen && (
            <ul className="custom-dropdown-list">
              <li className="item-recent" onClick={() => handleOptionClick('recent')}>최신순</li>
              <li className="item-favorite" onClick={() => handleOptionClick('favorite')}>좋아요순</li>
            </ul>
          )}
        </div>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <img src={leftArrowImg} alt="Left" />
        </button>
        {renderPageNumbers()}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          <img src={rightArrowImg} alt="Right" />
        </button>
      </div>
    </div>
  );
};

export default ProductList;