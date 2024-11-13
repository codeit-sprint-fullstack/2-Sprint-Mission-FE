import { useEffect, useState } from 'react';
import c from '@utils/constants';

export default function usePagination(totalCounts, pageSize, bundleSize = c.BUNDLE_SIZE, initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentBundle, setCurrentBundle] = useState(1);

  const totalPages = Math.ceil(totalCounts / pageSize);
  const totalBundles = Math.ceil(totalPages / bundleSize);

  const head = (currentBundle - 1) * bundleSize + 1;
  const bundlePages = [];

  for (let i = 0; i < bundleSize && head + i <= totalPages; i++) {
    bundlePages.push(head + i);
  }

  const goToPage = page => setCurrentPage(Math.max(Math.min(page, totalPages), 1));
  const getNextBundle = _ => {
    if (currentBundle < totalBundles) {
      setCurrentBundle(currentBundle + 1);
      goToPage(currentBundle * bundleSize + 1);
    }
  };
  const getPrevBundle = _ => {
    if (currentBundle > 1) {
      setCurrentBundle(currentBundle - 1);
      goToPage((currentBundle - 2) * bundleSize + 1);
    }
  };

  useEffect(
    _ => {
      const newBundle = Math.ceil(currentPage / bundleSize);
      if (newBundle !== currentBundle) setCurrentBundle(newBundle);
    },
    [currentPage, bundleSize],
  );

  return {
    currentPage,
    currentBundle,
    bundlePages,
    goToPage,
    getNextBundle,
    getPrevBundle,
    canGoPrev: currentBundle > 1,
    canGoNext: currentBundle < totalBundles,
  };
}
