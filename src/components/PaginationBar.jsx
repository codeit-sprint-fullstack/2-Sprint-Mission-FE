/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useViewport } from '@contexts/ViewportProvider';
import usePagination from '@hooks/usePagination';

const style = {
  paginationBar: css`
    height: 4rem;

    .pagination {
      margin: 0 auto;
      width: 30.4rem;
      height: 100%;

      display: flex;
      gap: 0.4rem;

      button {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        text-align: center;

        font-weight: 600;
        font-size: 1.6rem;
        color: var(--gray-500);

        border: 1px solid var(--gray-200);

        &:disabled {
          background-color: var(--gray-200);
        }

        &.now {
          background-color: var(--Primary-100);
          color: var(--gray-50);
          border: none;
        }
      }
    }
  `,
};

export default function PaginationBar({ totalCount, pageSize, onPageChange }) {
  const viewport = useViewport();
  const { currentPage, bundlePages, goToPage, getNextBundle, getPrevBundle, canGoPrev, canGoNext } = usePagination(
    totalCount,
    pageSize,
  );

  const handlePageChange = page => {
    goToPage(page);
    onPageChange?.(page);
  };

  return (
    <div id="paginationBar" css={style.paginationBar}>
      <div className={'pagination'}>
        <button onClick={getPrevBundle} disabled={!canGoPrev}>
          &lt;
        </button>
        {bundlePages.map(page => (
          <button key={page} onClick={() => handlePageChange(page)} className={page === currentPage ? 'now' : ''}>
            {page}
          </button>
        ))}
        <button onClick={getNextBundle} disabled={!canGoNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}
