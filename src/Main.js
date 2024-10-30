import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./component/Product.js";
import App from "./App.js";
import HomePage from "./page/HomePage.js";
import Items from "./page/Items.js";
import Registration from "./page/Registration.js";
import DetailPage from "./page/DetailPage.js";
import LoginPage from "./page/LoginPage.js";
import { UserLayout } from "./component/Layout.js";
import SignupPage from "./page/SignupPage.js";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="items" element={<Items />} />
            <Route path="registration" element={<Registration />} />
            <Route path="detailpage" element={<DetailPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
