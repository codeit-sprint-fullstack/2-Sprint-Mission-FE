import { useEffect, useState } from "react";
import styles from './Pagination.module.css'
// const ITEMS_PER_PAGE = 10;
const BUNDLE_LIMIT = 5;

export default function Pagination({ page, setPage, totalCount, pageSize}) {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);
  const totalPage = Math.ceil(totalCount / pageSize);

  const sliceArrayByLimit = (totalPage, BUNDLE_LIMIT) => {
    const totalPageArray = Array(totalPage)
      .fill()
      .map((_, i) => i);
    return Array(Math.ceil(totalPage / BUNDLE_LIMIT))
      .fill()
      .map(() => totalPageArray.splice(0, BUNDLE_LIMIT));
  };

  useEffect(() => {
    if (page % BUNDLE_LIMIT === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / BUNDLE_LIMIT)]);
    } else if (page % BUNDLE_LIMIT === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / BUNDLE_LIMIT) - 1]);
    }
  }, [page, totalPageArray]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, BUNDLE_LIMIT);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  return (
    <div className={styles.paginationWrapper}>
      <button className={styles.prevPageBtn} onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      <div className={styles.pageBtns}>
        {currentPageArray?.map((i) => (
          <button
            className={page === i + 1 ? styles.active : ''}
            key={i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button className={styles.nextPageBtn} onClick={() => setPage(page + 1)} disabled={page === totalPage}>
        &gt;
      </button>
    </div>
  );
}