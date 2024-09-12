import '../css/import.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemsPage from '../pages/ItemsPage.js';
import LandingPage from '../pages/LandingPage.js';
import GlobalContextProvider from './GlobalContextProvider.js';
import Pandamarket from '../layouts/Pandamarket.js';
import SignLayout from '../layouts/SignLayout.js';
import LoginPage from '../pages/LoginPage.js';
import SignupPage from '../pages/SignupPage.js';
import RegistrationPage from '../pages/RegistrationPage.js';
import ItemsDetailPage from '../pages/ItemsDetailPage.js';

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pandamarket />}>
            <Route index element={<LandingPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="items/:id" element={<ItemsDetailPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="sign" element={<SignLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
