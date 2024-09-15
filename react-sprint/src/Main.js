import { BrowserRouter, Routes, Route } from "react-router-dom";
import RendingPage from "./pages/RendingPage";
import SecondhandPage from "./pages/SecondhandPage";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RendingPage />} />
        <Route path="/items" element={<SecondhandPage />} />
      </Routes>
    </BrowserRouter>
  );
}
