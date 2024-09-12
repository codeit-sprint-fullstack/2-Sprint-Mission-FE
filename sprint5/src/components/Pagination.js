import React from 'react';
import '../css/Pagination.css';
import prevBtn from '../images/status=active@2x.png';
import nextBtn from '../images/status=active@2x-1.png';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-nav-button"
      >
        <img src={prevBtn} />
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          onClick={() => handleClick(startPage + index)}
          disabled={currentPage === startPage + index}
          className={currentPage === startPage + index ? 'active' : ''}
        >
          {startPage + index}
        </button>
      ))}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-nav-button"
      >
        <img src={nextBtn} />
      </button>
    </div>
  );
};

export default Pagination;
