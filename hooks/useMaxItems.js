import { useState, useEffect } from "react";
import { deviceCounts, getDeviceType } from "@/lib/deviceConfig";

export default function useMaxItems() {
  // 클라이언트 측에서 디바이스 유형에 따른 초기값 설정
  const initialMaxItems = typeof window === 'undefined'
    ? deviceCounts['desktop'].bestArticleCount // 서버에서는 기본값으로 desktop 설정
    : deviceCounts[getDeviceType(window.innerWidth)].bestArticleCount;

  const [maxItems, setMaxItems] = useState(initialMaxItems);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 처리
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const deviceType = getDeviceType(window.innerWidth);
        const newMaxItems = deviceCounts[deviceType].bestArticleCount

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
