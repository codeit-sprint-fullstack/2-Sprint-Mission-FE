import React, { useEffect, useState } from "react";
import useItem from "./hook/useItem";
import Item from "./Item";
import "./BestItem.css";

const getPageSize = () => {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 4;
  } else if (width >= 744) {
    return 2;
  } else {
    return 1;
  }
};

const BestItem = () => {
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleSize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const { item, loadingData } = useItem(1, pageSize, "favorite");

  if (loadingData) return <div>Loading...</div>;

  return (
    <div className="bestItem">
      <p className="bestItem-p">베스트 상품</p>
      <div className="item">
        {item.map((product) => (
          <Item key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default BestItem;
