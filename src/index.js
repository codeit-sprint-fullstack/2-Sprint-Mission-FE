import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ViewportProvider } from './contexts/ViewportContext';
import './css/import.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ViewportProvider>
    <App />
  </ViewportProvider>
);
