import React from "react";
import { Link } from "react-router-dom";
import Nav from "../component/Nav";
import BestItem from "../component/BestItem";
import ItemList from "../component/ItemList";
import Footer from "../component/Footer";

function ItemsPage() {
  return (
    <div className="ItemPage">
      <Nav />
      <ItemList />
      <Footer />
    </div>
  );
}

export default ItemsPage;
