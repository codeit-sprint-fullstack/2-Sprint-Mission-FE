import { useEffect, useState } from "react";
import "../style/ProductList.css";
import ProductMenuContainer from "./ProductMenuContainer.js";
import { Link } from "react-router-dom";
import defaultImg from "../imgFile/defaultProduct.png";

function ProductListItem({ item }) {
  const isValidImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(url);
  };
  return (
    <>
      <Link to={`/item/${item.id}`}>
        <div className="ProductListItem">
          <img
            src={
              item.images && isValidImageUrl(item.images)
                ? item.images
                : defaultImg
            }
            alt={item.name}
          />
          <div>
            <p className="ListFont1">{item.name}</p>
            <p className="ListFont2">{item.price}</p>
            <p className="ListFont3">♡ {item.favoriteCount}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

function ProductList({ items, onChange }) {
  const [displayCount, setDisplayCount] = useState(10);
  const [order, setOrder] = useState("recent");

  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setDisplayCount(4); //모바일 4개
      } else if (width <= 1199) {
        setDisplayCount(6); //태블릿 6개
      } else {
        setDisplayCount(10); //pc 10개
      }
    };

    window.addEventListener("resize", updateDisplayCount);
    updateDisplayCount(); //초기 로드 시 실행
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  const handleOrderChange = (order) => {
    setOrder(order);
    onChange(order);
  };

  return (
    <>
      <div className="Main">
        <ProductMenuContainer onChange={handleOrderChange} />
        <ul className="ProductListFrame">
          {items.slice(0, displayCount).map((item) => (
            <li key={item.id}>
              <ProductListItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ProductList;
