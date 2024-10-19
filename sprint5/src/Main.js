import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import RegistrationPage from './pages/RegistrationPage';
import DetailPage from './pages/DetailPage';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="items">
            <Route index element={<ProductListPage />} />
            <Route path=":id" element={<DetailPage />} />
          </Route>
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
