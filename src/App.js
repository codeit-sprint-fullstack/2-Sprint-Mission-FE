import React from "react";
import Header from "./components/Header";
import Product from "./components/Product";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Product />
      </main>
      <Footer />
    </div>
  );
}

export default App;
