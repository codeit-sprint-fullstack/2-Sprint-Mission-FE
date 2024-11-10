import { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange, isPreviousData }) => {
  const maxPageDisplay = 5; // 표시할 최대 페이지 수
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 743);
    };

    checkIsMobile(); // 초기 실행
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  if (totalPages <= 1) {
    return null; 
  }

  const pageNumbers = [];

  if (isMobile) {
    const startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
    const endPage = Math.min(totalPages, startPage + maxPageDisplay - 1);

    if (currentPage > 1) pageNumbers.push('<'); // 모바일에서만 이전 버튼 추가

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages) pageNumbers.push('>'); // 모바일에서만 다음 버튼 추가
  } else {
    pageNumbers.push(1);

    if (currentPage > Math.ceil(maxPageDisplay / 2)) pageNumbers.push('...');

    const startPage = Math.max(2, currentPage - Math.floor(maxPageDisplay / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPageDisplay - 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) pageNumbers.push('...');

    pageNumbers.push(totalPages);
  }

  const handlePrevClick = () => {
    if (!isPreviousData && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isPreviousData && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      {/* 데스크탑 모드에서만 표시되는 이전 버튼 */}
      {!isMobile && (
        <button
          className={`${styles['pagination-button']} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={handlePrevClick}
          disabled={currentPage === 1 || isPreviousData}
        >
          &lt; {/* 이전 버튼 */}
        </button>
      )}

      {pageNumbers.map((page, index) =>
        page === '<' || page === '>' ? (
          <button
            key={index}
            className={`${styles['pagination-button']} ${page === '<' ? styles.prev : styles.next}`}
            onClick={page === '<' ? handlePrevClick : handleNextClick}
            disabled={isPreviousData}
          >
            {page}
          </button>
        ) : page === '...' ? (
          <span key={index} className={styles['pagination-ellipsis']}>
            {page}
          </span>
        ) : (
          <button
            key={index}
            className={`${styles['pagination-button']} ${currentPage === page ? styles.active : ''}`}
            onClick={() => !isPreviousData && onPageChange(page)}
            disabled={isPreviousData}
          >
            {page}
          </button>
        )
      )}

      {/* 데스크탑 모드에서만 표시되는 다음 버튼 */}
      {!isMobile && (
        <button
          className={`${styles['pagination-button']} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={handleNextClick}
          disabled={currentPage === totalPages || isPreviousData}
        >
          &gt; {/* 다음 버튼 */}
        </button>
      )}
    </div>
  );
};

export default Pagination;
