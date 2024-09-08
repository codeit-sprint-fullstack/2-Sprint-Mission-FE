import React from 'react';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="container">
        <a href="/" className="navbar-brand">
          <img src="/logo.png" alt="Panda Market Logo" className="logo" />
          Panda Market
        </a>
        <ul className="navbar-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;