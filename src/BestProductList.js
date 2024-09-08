import { useEffect, useState } from "react";
import "./BestProductList.css";

function BestProductItem({ item }) {
  return (
    <div className="BestItemList">
      <img src={item.images} alt={item.name} />
      <div>
        <p className="ListFont1">{item.name}</p>
        <p className="ListFont2">{item.price}</p>
        <p className="ListFont3">♡ {item.favoriteCount}</p>
      </div>
    </div>
  );
}

function BestProductList({ items }) {
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;// window는 브라우저 크기 에 변화에따라.
      if (width <= 743) {
        setDisplayCount(1); // 모바일: 1개
      } else if (width <= 1199) {
        setDisplayCount(2); // 태블릿: 2개
      } else {
        setDisplayCount(4); // PC: 4개
      }
    };

    window.addEventListener("resize", updateDisplayCount);
    updateDisplayCount(); // 초기 로드 시 실행

    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  return (
    <div className="BestSection">
      <div className="leftArray">
        <p className="BestFont">베스트 상품</p>
      </div>
      <ul className="BestProductFrame">
        {/* 화면 크기에 따라 표시할 이미지 수 결정 */}
        {items.slice(0, displayCount).map((item) => (
          <li key={item.id} className="BestProductItem">
            <BestProductItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestProductList;