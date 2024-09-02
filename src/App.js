import React from "react";
import Header from "./Header";
import Product from "./Product";
import Footer from "./Footer";

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
