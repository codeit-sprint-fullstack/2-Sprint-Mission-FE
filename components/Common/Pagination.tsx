import styles from './Pagination.module.css';
import Image from 'next/image';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  const handleClick = (page: number) => {
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
        <Image
          className={styles.img}
          src="/images/status=active.png"
          width={20}
          height={20}
          alt="왼쪽 화살표"
        />
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
        <Image
          className={styles.img}
          src="/images/status=active-1.png"
          width={20}
          height={20}
          alt="왼쪽 화살표"
        />
      </button>
    </div>
  );
};

export default Pagination;
