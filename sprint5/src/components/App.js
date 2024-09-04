import React, { useState, useEffect } from "react";
import "../style/App.css";
import { getProducts } from "../api.js";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import Products from "./Products.js";
import BestProducts from "./BestProducts.js";

export default function App() {
  const [items, setItems] = useState([]);
  const [best, setBest] = useState([]);

  const handleLoad = async () => {
    try {
      const products = await getProducts();
      setItems(products);
      // Best Items 4개만 보이게 만들기
      const topBestProducts = [...products].sort((a, b) => b.favoriteCount - a.favoriteCount).slice(0, 4);
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
      <Products items={items} />
      <Footer clasName="Footer" />
    </>
  );
}
