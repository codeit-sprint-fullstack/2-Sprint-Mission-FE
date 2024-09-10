import '../reset.css'
import BestProduct from './BestProduct';
import SalesProduct from './SalesProduct';
import '../css/App.css'
import Footer from './Footer';
import Nav from './Nav'

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