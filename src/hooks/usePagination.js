import { useCallback, useEffect, useState } from 'react';

export default function usePagination(totalCounts, pageSize, bundleSize, onPageChange, initialPage = 1, initialBundleCount = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCounts / pageSize));
  const [bundleCount, setBundleCount] = useState(initialBundleCount);
  const [bundle, setBundle] = useState([]);
  const [totalBundleCounts, setTotalBundleCounts] = useState(Math.ceil(totalPages / bundleSize));

  const goToPage = useCallback(
    page => {
      setCurrentPage(Math.max(Math.min(page, totalPages), 1));
      onPageChange(page);
    },
    [totalPages, onPageChange],
  );

  const nextBundle = () => {
    setBundleCount(prev => Math.min(prev + 1, totalBundleCounts));
  };

  const prevBundle = () => {
    setBundleCount(prev => Math.max(prev - 1, 1));
  };

  // const nextPage = () => {
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // };

  // const prevPage = () => {
  //   setCurrentPage((prev) => Math.max(prev - 1, 1));
  // };

  useEffect(() => {
    // 총 아이템 or 페이지 당 개수가 변경되면 총 페이지 수 재계산
    setTotalPages(Math.ceil(totalCounts / pageSize));
  }, [totalCounts, pageSize]);

  useEffect(() => {
    // 총 페이지 or 번들 당 개수가 변경되면 총 번들 수 재계산
    setTotalBundleCounts(Math.ceil(totalPages / bundleSize));
  }, [totalPages, bundleSize]);

  useEffect(() => {
    const newBundle = [];
    const head = (bundleCount - 1) * bundleSize + 1;

    for (let i = 0; i < bundleSize; i++) {
      const page = head + i;
      if (page > totalPages) break;
      newBundle.push(page);
    }

    setBundle(newBundle);
    goToPage(head);
  }, [bundleCount, totalPages, bundleSize, goToPage]);

  return { currentPage, bundle, bundleCount, totalBundleCounts, goToPage, nextBundle, prevBundle };
}
