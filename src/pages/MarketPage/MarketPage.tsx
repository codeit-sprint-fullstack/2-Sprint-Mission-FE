import React from 'react';
import AllItemsSection from './components/AllItemsSection.jsx';
import './MarketPage.css';
import BestItemsSection from './components/BestItemsSection';

function MarketPage() {
  return (
    <>
      <BestItemsSection />
      <AllItemsSection />
    </>
  );
}

export default MarketPage;
