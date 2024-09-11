import { Route, Router, Routes } from "react-router-dom";
import Layout from "./components/Default/Layout";
import HomePage from "./components/HomePage/HomePage";
import Registration from "./components/Registration/Registration";
import ProductList from "./components/ProductList/ProductList";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/items" element={<ProductList />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
