import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import SecondhandMarket from "./pages/SecondhandMarket";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<SecondhandMarket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
