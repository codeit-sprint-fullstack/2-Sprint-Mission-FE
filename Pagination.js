import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageClick }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={() => onPageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
        </li>

        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageClick(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;