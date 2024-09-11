import React from 'react';

const BestProducts = ({ products }) => {
  return (
    <div className="best-products">
      {products.map((product) => (
        <div key={product.id} className="best-product-card">
          <img src={product.imageUrl} alt={product.name} className="best-product-image" />
          <h3>{product.name}</h3>
          <p>{product.price}원</p>
        </div>
      ))}
    </div>
  );
};

export default BestProducts;