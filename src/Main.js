import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./component/Product.js";
import App from "./App.js";
import HomePage from "./page/HomePage.js";
import Items from "./page/Items.js";
import TestProject from "./component/TestFile.js";
import Registration from "./page/Registration.js";
import DetailPage from "./page/DetailPage.js";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/items" element={<Items />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/detailpage" element={<DetailPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
