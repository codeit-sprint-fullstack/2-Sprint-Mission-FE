import arrow_left from '../assets/img/arrow_left.png';
import arrow_right from '../assets/img/arrow_right.png';
import '../css/Pagination.css';

export default function Pagination({ page, setPage, totalCount }) {
  const pageLimit = 5;
  const pageGroup = Math.ceil(page / pageLimit);
  const totalPages = Math.ceil(totalCount / 10);

  const getVisiblePages = () => {
    const startPage = (pageGroup - 1) * pageLimit + 1;
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const visiblePages = getVisiblePages();

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className='pagination'>
        <button className='navigator' onClick={handlePrevClick} disabled={page === 1}>
            <img src={arrow_left} alt='이전 페이지로' />
        </button>
        {visiblePages.map((pageNumber) => (
        <button 
          key={pageNumber}
          className={pageNumber === page ? 'active' : ''}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
        <button className='navigator' onClick={handleNextClick} disabled={page === totalPages}>
            <img src={arrow_right} alt='다음 페이지로' />
        </button>
    </div>
  );
}
