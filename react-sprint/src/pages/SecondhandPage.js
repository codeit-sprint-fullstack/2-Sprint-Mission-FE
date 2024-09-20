import "../styles/reset.css";
import "../styles/variables.css";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

export default function SecondhandPage() {
  return (
    <div className="App">
      <Header />
      <ProductList />
      <Footer />
    </div>
  );
}
