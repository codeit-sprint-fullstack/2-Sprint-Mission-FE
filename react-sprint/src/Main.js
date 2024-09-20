import { BrowserRouter, Routes, Route } from "react-router-dom";
import RendingPage from "./pages/RendingPage";
import SecondhandPage from "./pages/SecondhandPage";
import AddingProductPage from "./pages/AddingProductPage";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RendingPage />} />
        <Route path="/items" element={<SecondhandPage />} />
        <Route path="/registration" element={<AddingProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
