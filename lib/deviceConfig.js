const DESKTOP_WIDTH = 1200;
const TABLET_WIDTH = 744;

/**
 * 디바이스별 초기값 설정
 * bestArticleCount: 베스트 게시글의 최대 항목 수
 * bestProductCount: 베스트 상품의 최대 항목 수
 * productCounts   : 판매 중인 상품의 최대 항목 수
 */
export const deviceCounts = {
  mobile: {
    bestArticleCount: 1,
    bestProductCount: 1,
    productCount: 4,
  },
  tablet: {
    bestArticleCount: 2,
    bestProductCount: 2,
    productCount: 6,
  },
  desktop: {
    bestArticleCount: 3,
    bestProductCount: 4,
    productCount: 10,
  },
};

export const getDeviceType = (width) => {
  if (width >= DESKTOP_WIDTH) return 'desktop';
  if (width >= TABLET_WIDTH) return 'tablet';
  return 'mobile';
};
