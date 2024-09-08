import { useState } from "react"

const BUNDLE_COUNT = 5;
const ITEMS_PER_PAGE = 10;

export default function Pagination({ currentPage, setCurrentPage, totalCount }) {
  const totalBundle = Math.ceil(currentPage / BUNDLE_COUNT);
  const totalPage = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const getVisiblePages = () => {
    const startPage = (totalBundle - 1) * BUNDLE_COUNT + 1;
    const endPage = Math.min(startPage + BUNDLE_COUNT - 1, totalPage);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const visiblePages = getVisiblePages();

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   

  const handlePrevPage = () => {}

  return (
    <div>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        &lt;
      </button>
      {visiblePages.map((pageNumber) => (
        <button 
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={handleNextClick} disabled={currentPage === totalPage}>
        &gt;
      </button>
    </div>
  )
}