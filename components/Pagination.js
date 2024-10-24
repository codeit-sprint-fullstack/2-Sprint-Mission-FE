import arrow_left from '@/public/arrow_left.png';
import arrow_right from '@/public/arrow_right.png';
import style from './styles/Pagination.module.css';
import Image from "next/image";

export default function Pagination({ page, setPage, totalCount, pageSize }) {
  // 페이지 버튼을 5개씩 보여주기 위함
  const pageLimit = 5;
  const pageGroup = Math.ceil(page / pageLimit);
  const totalPages = Math.ceil(totalCount / pageSize);

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
    <div className={style.pagination}>
        <button className={style.navigator} onClick={handlePrevClick} disabled={page === 1}>
            <Image src={arrow_left} alt='이전 페이지로' />
        </button>
        {visiblePages.map((pageNumber) => (
        <button 
          key={pageNumber}
          className={pageNumber === page ? style.active : ''}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
        <button className={style.navigator} onClick={handleNextClick} disabled={page === totalPages}>
            <Image src={arrow_right} alt='다음 페이지로' />
        </button>
    </div>
  );
}