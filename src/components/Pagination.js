import React from "react";
import "../style/Pagination.css";

function PageNation({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 5;

  let startPage = 1;
  let endPage = Math.min(totalPages, maxPagesToShow);

  if (currentPage > 3) {
    startPage = currentPage - 2;
    endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  }

  if (endPage === totalPages && totalPages >= maxPagesToShow) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
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

  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="pagination-nav-button"
      >
        &lt;
      </button>
      {pageButtons}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="pagination-nav-button"
      >
        &gt;
      </button>
    </div>
  );
}

export default PageNation;
