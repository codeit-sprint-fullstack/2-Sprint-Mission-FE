import './App.css';
import Gnb from './Gnb/Gnb';
import Footer from './Footer/Footer';
import ProductMain from './ProductMain/ProductMain';

function App() {
  return (
    <div className="App">
      <Gnb />
      <main className="content with-header">
        <ProductMain />
      </main>
      <Footer />
    </div>
  );
}

export default App;
