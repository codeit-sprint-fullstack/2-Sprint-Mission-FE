import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import BestProduct from "./components/BestProduct";
import SaleProduct from "./components/SaleProduct";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <BestProduct />
          <SaleProduct />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
