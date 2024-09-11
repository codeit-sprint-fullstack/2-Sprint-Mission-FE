import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ProductList from "./ProductList";
import BestProducts from "./BestProducts";
import Pagination from "./Pagination";
import { getProducts, getBestProducts } from "./api";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * limit; 
      const { products: fetchedProducts, totalCount } = await getProducts(sortBy, limit, offset);
      setProducts(fetchedProducts);
      setTotalItems(totalCount); 
      setLoading(false);
    };
    
    const fetchBestProducts = async () => {
      const fetchedBestProducts = await getBestProducts();
      setBestProducts(fetchedBestProducts);
    };

    fetchProducts();
    fetchBestProducts();
  }, [sortBy, currentPage]);

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="App">
      <Navigation />
      <div className="container">
        <h1>Best Products</h1>
        <BestProducts products={bestProducts} />

        <div className="search-sort">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="favorite">Most Liked</option>
          </select>
        </div>

        <ProductList products={filteredProducts} loading={loading} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={setCurrentPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;