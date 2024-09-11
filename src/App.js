import React from 'react';
import './styles/reset.css';
import './styles/variables.css';
import './App.css';
import Header from './components/Header';
import BestProductList from './components/BestProductList';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <BestProductList />
      <ProductList />
      <Footer />
    </div>
  );
}

export default App;
