import React, { useState, useEffect } from "react";
import { getProducts } from "../api.js";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import Products from "./Products.js";
import BestProducts from "./BestProducts.js";

export default function App() {
  const [items, setItems] = useState([]);
  const [best, setBest] = useState([]);
  const [order, setOrder] = useState("");

  const sortedItem = items.sort((a, b) => {
    if (order === "createdAt") return new Date(b.createdAt) - new Date(a.createdAt); //날짜 형식으로 변환
    return b[order] - a[order];
  });
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("favoriteCount");

  const handleLoad = async () => {
    try {
      const products = await getProducts();
      setItems(products);
      // Best Items 4개만 보이게 만들기
      const bestProducts = [...products].sort((a, b) => b.favoriteCount - a.favoriteCount);
      const topBestProducts = bestProducts.slice(0, 4);
      setBest(topBestProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <Nav clasName="navigation" />
      <BestProducts items={best} />
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>좋아요순</button>
      </div>
      <Products items={sortedItem} />
      <Footer clasName="Footer" />
    </>
  );
}
