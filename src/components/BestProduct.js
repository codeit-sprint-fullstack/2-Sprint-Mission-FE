import React, { useEffect, useState } from "react";
import ProductContent from "./ProductContent.js";
import "../style/BestProduct.css";

function BestProduct() {
  const [bestProduct, setBestProduct] = useState({ list: [] });
  const [order] = useState("favorite");
  const [visibleProduct, setVisibleProduct] = useState(4);

  const fetchBestProduct = async (order = "") => {
    const query = `sort=${order}`;
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?${query}&pageSize=100`
    );
    const data = await response.json();

    const sortedData = {
      ...data,
      list: data.list.sort((a, b) => b.favoriteCount - a.favoriteCount),
    };

    setBestProduct(sortedData);
  };

  const updateVisibleProduct = () => {
    const width = window.innerWidth;
    if (width >= 1199) {
      setVisibleProduct(4);
    } else if (width >= 768) {
      setVisibleProduct(2);
    } else {
      setVisibleProduct(1);
    }
  };

  useEffect(() => {
    updateVisibleProduct();

    window.addEventListener("resize", updateVisibleProduct);

    return () => {
      window.removeEventListener("resize", updateVisibleProduct);
    };
  }, []);

  useEffect(() => {
    const handleLoad = async () => {
      await fetchBestProduct(order);
    };

    handleLoad();
  }, [order]);

  return (
    <div className="whole">
      <h2 className="best">베스트 상품</h2>
      <div className="bestProduct">
        <div className="productList">
          {bestProduct.list.slice(0, visibleProduct).map((product) => (
            <ProductContent
              key={product.id}
              product={product}
              useDescription={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestProduct;
