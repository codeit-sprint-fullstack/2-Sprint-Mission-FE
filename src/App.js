import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import LandingPage from "./pages/LandingPage.js";
import ItemsPage from "./pages/ItemsPage.js";
import RegistrationPage from "./pages/RegistrationPage.js";
import LoginPage from "./pages/LoginPage.js";
import PrivacyPage from "./pages/PrivacyPage.js";
import FaqPage from "./pages/FaqPage.js";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
