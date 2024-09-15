import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Components/App.js";
import HomePage from "./pages/HomePage.js";
import ItemsPage from "./pages/ItemsPage.js";
import RegistrationPage from "./pages/RegistrationPage.js";
export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
