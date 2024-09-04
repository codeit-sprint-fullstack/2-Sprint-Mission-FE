import React, { useState, useEffect } from "react";
import { getProducts } from "../api.js";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import Products from "./Products.js";

export default function App() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    try {
      const products = await getProducts();
      // 응답 데이터에서 배열을 추출
      setItems(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <Nav />
      <Products items={items} />
      <Footer />
    </>
  );
}
