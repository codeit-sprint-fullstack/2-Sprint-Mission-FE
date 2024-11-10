import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ItemProduct from "./page/ItemProduct.js";
import App from "./App.js";
import HomePage from "./page/HomePage.js";
import Registration from "./page/Registration.js";
import ItemDetailPage from "./page/ItemDetailPage.js";
import LoginPage from "./page/LoginPage.js";
import { UserLayout } from "./component/Layout.js";
import SignupPage from "./page/SignupPage.js";
import PatchPage from "./page/PatchPage.js";

const isAuthenticated = () => {
  return localStorage.getItem("accessToken") !== null;
};

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

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
              <Route
                path="items/:itemId"
                element={<ProtectedRoute element={<ItemDetailPage />} />}
              />
              <Route
                path="items/:itemId/patchitem"
                element={<ProtectedRoute element={<PatchPage />} />}
              />
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
