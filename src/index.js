import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rendering from './Rendering'; 
import Market from './Market';
import Registration from './Registration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Rendering />} />  
      <Route path="/items" element={<Market />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  </Router>
);