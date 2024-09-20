import "../css/import.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalContextProvider from "./GlobalContextProvider.jsx";
import Pandamarket from "../layouts/Pandamarket.jsx";
import SignLayout from "../layouts/SignLayout.jsx";
import ItemsPage from "../pages/ItemsPage.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import ItemsDetailPage from "../pages/ItemsDetailPage.jsx";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pandamarket />}>
            <Route index element={<LandingPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="items/:id" element={<ItemsDetailPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="sign" element={<SignLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
