import { useState, useEffect } from "react";

const DESKTOP_ITEMS = 3;
const TABLET_ITEMS = 2;
const MOBILE_ITEMS = 1;

export default function useMaxItems() {
  const [maxItems, setMaxItems] = useState(null); // 초기값을 null로 설정하여 서버사이드 렌더링에서 값이 나오지 않도록 함

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 처리
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        let newMaxItems;
        if (window.innerWidth >= 1200) {
          newMaxItems = DESKTOP_ITEMS;
        } else if (window.innerWidth >= 744) {
          newMaxItems = TABLET_ITEMS;
        } else {
          newMaxItems = MOBILE_ITEMS;
        }

        // 새로운 maxItems 값이 기존 값과 다를 때만 상태를 업데이트
        setMaxItems((prevMaxItems) => {
          if (prevMaxItems !== newMaxItems) {
            return newMaxItems;
          }
          return prevMaxItems;
        });
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); 

  return maxItems;
}
