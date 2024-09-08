import BestProduct from './BestProduct';
import Footer from './Footer';
import Nav from './Nav'
import SalesProduct from './SalesProduct';
import '../css/App.css'

export default function App() {


  return (
    <div className='full'>
      <Nav />
      <div className='main'>
        <BestProduct />
        <SalesProduct />
      </div>
      <Footer />
    </div>
  );
}