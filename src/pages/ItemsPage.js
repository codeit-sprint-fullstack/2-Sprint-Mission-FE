import React from 'react';
import Header from '../components/Header';
import BestProductList from '../components/BestProductList';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

function ItemsPage() {
  return (
    <div className="ItemPage">
      <Header />
      <BestProductList />
      <ProductList />
      <Footer />
    </div>
  );
}

export default ItemsPage;
