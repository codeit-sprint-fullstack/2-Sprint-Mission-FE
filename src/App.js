import Nav from "./component/Nav";
import Footer from "./component/Footer";
import BestItem from "./component/BestItem";
import ItemList from "./component/ItemList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
