import { useState, useEffect } from "react";
import useOptionProducts from "../hooks/useOptionProducts";
import Product from "./Product";
import "./BestProductList.css";

function getPageSize() {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 4;
  } else if (width >= 744) {
    return 2;
  } else {
    return 1;
  }
}

export default function BestProductList() {
  const [pageSize, setPageSize] = useState(getPageSize());
  // const [order] = useState("favoriteCount");
  const { items } = useOptionProducts(2, pageSize, "favoriteCount");

  const sortedItems = items.sort((a, b) => b[items.order] - a[items.order]);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bestProductList">
      <div className="bestProduct">
        <h2 className="bestProductListText">베스트 상품</h2>
        {sortedItems.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
