import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './components/App';
import Homepage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>

          <Route index element={<Homepage />} />
          <Route path="items" index element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Main;