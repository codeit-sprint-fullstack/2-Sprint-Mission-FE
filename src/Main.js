import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemProduct from "./page/ItemProduct.js";
import App from "./App.js";
import HomePage from "./page/HomePage.js";
import Registration from "./page/Registration.js";
import ItemDetailPage from "./page/ItemDetailPage.js";
import LoginPage from "./page/LoginPage.js";
import { UserLayout } from "./component/Layout.js";
import SignupPage from "./page/SignupPage.js";
import Folder from "./page/Folder.js";

function Main() {
  return (
    <>
      <BrowserRouter>
        <App>
          <Routes>
            <Route element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="items" element={<ItemProduct />} />
              <Route path="registration" element={<Registration />} />
              <Route path="detailpage" element={<ItemDetailPage />} />
              <Route path="folder" element={<Folder />} />
              <Route path="item/:itemId" element={<ItemDetailPage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="signin" element={<SignupPage />} />
          </Routes>
        </App>
      </BrowserRouter>
    </>
  );
}

export default Main;
