import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./component/Product.js";
import App from "./App.js";
import HomePage from "./page/HomePage.js";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
