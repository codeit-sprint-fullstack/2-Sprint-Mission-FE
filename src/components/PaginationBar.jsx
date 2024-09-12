import style from "./css/PaginationBar.module.css";
import { useViewport } from "../contexts/ViewportContext.jsx";
import { ITEM_PAGE_SIZE } from "./ProductsOnSale.jsx";
import usePagination from "../hooks/usePagination.js";

const BUNDLE_SIZE = 5;

function PaginationBar({ totalCount, onPageChange }) {
  const viewport = useViewport();
  const [
    currentPage,
    bundle,
    bundleCount,
    totalBundleCounts,
    goToPage,
    nextBundle,
    prevBundle,
  ] = usePagination(
    totalCount,
    ITEM_PAGE_SIZE[viewport],
    BUNDLE_SIZE,
    onPageChange
  );

  return (
    <div id={`${style.productOnSalePagination}`}>
      <div className={`${style.pagination} ${style.productOnSale}`}>
        <button
          id={`${style.pageBefore}`}
          onClick={prevBundle}
          disabled={bundleCount <= 1}
        >
          &lt;
        </button>
        {bundle.map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={p === currentPage ? `${style.now}` : ""}
          >
            {p}
          </button>
        ))}
        <button
          id={`${style.pageAfter}`}
          onClick={nextBundle}
          disabled={bundleCount >= totalBundleCounts}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default PaginationBar;
