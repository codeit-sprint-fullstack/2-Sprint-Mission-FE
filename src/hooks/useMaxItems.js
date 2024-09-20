import { useState, useEffect } from "react";

function useMaxitems() {
  
  // 초기값을 현재 창 너비에 따라 설정
  const [maxItems, setMaxItems] = useState(() => {
    if (window.innerWidth >= 1200) {
      return 10; // Desktop
    } else if (window.innerWidth >= 744) {
      return 6; // Tablet
    } else {
      return 4; // Mobile
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setMaxItems(10);
      } else if (window.innerWidth >= 744) {
        setMaxItems(6);
      } else {
        setMaxItems(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 실행 시 호출

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return maxItems;
}

export default useMaxitems;