import React, { useState, useEffect } from "react";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import Products from "./components/Products.js";
import BestProducts from "./components/BestProducts.js";

export default function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <BestProducts />
        <Products />
      </div>
      <Footer />
    </>
  );
}
