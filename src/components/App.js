import './App.css';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import ProductMain from './ProductMain/ProductMain';

function App() {
  return (
    <div className="App">
      <Nav />
      <main className="content with-header">
        <ProductMain />
      </main>
      <Footer />
    </div>
  );
}

export default App;
