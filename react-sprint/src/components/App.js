import "../styles/reset.css";
import "../styles/variables.css";
import "./App.css";
import Header from "./Header";
import BestProductList from "./BestProductList";
import ProductList from "./ProductList";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="App">
      <Header />
      <BestProductList />
      <ProductList />
      <Footer />
    </div>
  );
}
