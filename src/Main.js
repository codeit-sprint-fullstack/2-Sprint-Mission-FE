import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import SecondhandMarket from "./pages/SecondhandMarket";
import Registration from "./pages/RegistrationPage";
import { ViewportProvider } from './contexts/viewportContext';

function Main() {
  return (
    <ViewportProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="items" element={<SecondhandMarket />} />
            <Route path="registration" element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ViewportProvider>
  );
}

export default Main;
