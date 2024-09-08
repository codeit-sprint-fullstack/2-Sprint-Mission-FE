import React from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import BestProduct from "./components/BestProduct";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BestProduct />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
