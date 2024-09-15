import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";
import MarketPage from "./page/MarketPage";
import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import RegisterPage from "./page/RegisterPage";
import ProductDetailPage from "./page/ProductDetailPage";

export default function Main() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} >
                <Route index element={<LandingPage />} />
                <Route path="/items" element={<MarketPage />} />
                <Route path="/items/:id" element={<ProductDetailPage />} />
                <Route path='/registration' element={<RegisterPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    </BrowserRouter>
  );
}
