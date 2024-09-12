import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageDisplay = 5; // 표시할 최대 페이지 수를 10개로 설정
  const isMobile = window.innerWidth <= 743; // 모바일 환경 감지
  const pageNumbers = [];

  if (isMobile) {
    const startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
    const endPage = Math.min(totalPages, startPage + maxPageDisplay - 1);

    if (currentPage > 1) pageNumbers.push('<'); // 이전 버튼 추가

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages) pageNumbers.push('>'); // 다음 버튼 추가
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
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      {!isMobile && (
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          &lt; {/* 이전 버튼 */}
        </button>
      )}

      {pageNumbers.map((page, index) =>
        page === '<' || page === '>' ? (
          <button
            key={index}
            className={`pagination-button ${page === '<' ? 'prev' : 'next'}`}
            onClick={page === '<' ? handlePrevClick : handleNextClick}
          >
            {page}
          </button>
        ) : page === '...' ? (
          <span key={index} className="pagination-ellipsis">
            {page}
          </span>
        ) : (
          <button
            key={index}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {!isMobile && (
        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          &gt; {/* 다음 버튼 */}
        </button>
      )}
    </div>
  );
};

export default Pagination;
