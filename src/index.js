import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './css/import.css';
import GlobalContextProvider from './components/GlobalContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
