import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js";
import HomePage from "./pages/homepage/HomePage.js";
import ItemsPage from "./pages/itemspage/ItemsPage.js";
import FreeBoardPage from "./pages/freeboardpage/FreeBoardPage.js";
import RegistrationPage from "./pages/registrationpage/RegistrationPage.js";
function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="freeboard" element={<FreeBoardPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Main;
