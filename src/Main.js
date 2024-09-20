import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App.js";
import HomePage from "./pages/HomePage.js";
import LogInPage from "./pages/LogInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import ItemsPage from "./pages/ItemsPage.js";
import ItemsDetailPage from "./pages/ItemsDetailPage.js";
import BulletinBoardPage from "./pages/BulletinBoardPage.js";
import RegistrationPage from "./pages/RegistrationPage.js";
import PrivacyPage from "./pages/PrivacyPage.js";
import FaqPage from "./pages/FaqPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":id" element={<ItemsDetailPage />} />
          </Route>
          <Route path="bulletinboard" element={<BulletinBoardPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
