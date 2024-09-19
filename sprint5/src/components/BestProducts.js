import { getProducts } from "../api.js";
import { useEffect, useState } from "react";

function CostFormat(amount) {
  return amount.toLocaleString();
}

export default function BestProducts() {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(4); // 초기값 4로 설정

  // 화면 크기에 따라 pageSize 변경
  function updatePageSize() {
    if (window.matchMedia("(min-width: 744px) and (max-width: 1199px)").matches) {
      setPageSize(2); // 744px ~ 1199px
    } else if (window.matchMedia("(min-width: 375px) and (max-width: 743px)").matches) {
      setPageSize(1); // 375px ~ 743px
    } else {
      setPageSize(4); // 그 외에는 기본 4
    }
  }

  function ProductList() {
    getProducts(1, pageSize, "favorite", "").then((productlist) => {
      setItems(productlist);
    });
  }

  useEffect(() => {
    updatePageSize(); // 컴포넌트가 처음 렌더링될 때 pageSize 설정
    ProductList(); // 처음 로드할 때 API 호출

    // 화면 크기가 변경될 때마다 pageSize 업데이트
    window.addEventListener("resize", updatePageSize);

    // 화면 크기 변화 감지 후 ProductList를 다시 호출
    return () => window.removeEventListener("resize", updatePageSize);
  }, [pageSize]);

  return (
    <div>
      <h1 className="header">베스트 상품</h1>
      <ul className="bestProductsListing">
        {items.map((item) => {
          return (
            <li className="bestProductsContainer" key={item.id}>
              <img className="bestImg" src={item.images} alt={`the picture of ${item.title}`} />
              <p className="name">{item.name}</p>
              <p className="price"> {CostFormat(item.price)}원</p>
              <p className="like">♡ {item.favoriteCount}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
