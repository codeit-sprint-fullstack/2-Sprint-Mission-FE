/** @format */

// import React from "react";
import Header from "./components/Header";
import BestProducts from "./components/BestProducts";
import ProductsList from "./components/ProductsList";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
      <Header />
      <BestProducts />
      <ProductsList />
      <ProductCard />
      <Pagination />
      <Footer />
    </main>
  );
}

export default App;
