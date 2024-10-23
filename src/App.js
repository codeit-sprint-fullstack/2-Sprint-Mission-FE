import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Default/Layout";
import HomePage from "./components/HomePage/HomePage";
import Registration from "./components/Registration/Registration";
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ProductList />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/items/:id" element={<ProductDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  );
}

export default App;
