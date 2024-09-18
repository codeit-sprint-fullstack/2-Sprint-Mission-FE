import styles from '../css/Pagination.module.css';
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
    <div className={styles.pagination}>
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
      >
        <img src={prevBtn} className={styles.img} />
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          onClick={() => handleClick(startPage + index)}
          disabled={currentPage === startPage + index}
          className={
            currentPage === startPage + index ? styles.active : styles.button
          }
        >
          {startPage + index}
        </button>
      ))}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.button}
      >
        <img src={nextBtn} className={styles.img} />
      </button>
    </div>
  );
};

export default Pagination;
