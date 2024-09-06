import '../css/Pagination.css';
import { useCallback, useEffect, useState } from 'react';
import PageButton from './PageButton';
import { useViewport } from '../contexts/ViewportContext';
import { ITEM_PAGE_SIZE } from './ProductsOnSale';

const BUNDLE_SIZE = 5;

function Pagination({ totalCount, onPageChange }) {
  const viewport = useViewport();
  const [now, setNow] = useState(1);
  const [pBundle, setPBundle] = useState(1);
  const [bundle, setBundle] = useState([]);
  const totalPages = Math.ceil(totalCount / ITEM_PAGE_SIZE[viewport]);
  const totalBundle = Math.ceil(totalPages / BUNDLE_SIZE);

  const handlePageChange = useCallback(
    (p) => {
      setNow(p);
      onPageChange(p);
    },
    [onPageChange]
  );
  const handlePrevBundle = () => setPBundle((pb) => pb - 1);
  const handleNextBundle = () => setPBundle((pb) => pb + 1);

  useEffect(() => {
    const newBundle = [];
    const head = (pBundle - 1) * BUNDLE_SIZE + 1;
    for (let i = 0; i < BUNDLE_SIZE; i++) {
      const page = head + i;
      if (page > totalPages) break;
      newBundle.push(page);
    }
    setBundle(newBundle);
    handlePageChange(head);
  }, [pBundle, totalPages, handlePageChange]);

  return (
    <div id="productOnSalePagination">
      <div className="pagination productOnSale">
        <button
          id="pageBefore"
          onClick={handlePrevBundle}
          disabled={pBundle <= 1}
        >
          &lt;
        </button>
        {bundle.map((p) => (
          <PageButton value={p} key={p} now={now} onClick={handlePageChange} />
        ))}
        <button
          id="pageAfter"
          onClick={handleNextBundle}
          disabled={pBundle >= totalBundle}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
