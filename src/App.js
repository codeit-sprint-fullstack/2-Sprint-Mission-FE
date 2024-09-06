import Nav from './component/Nav';
import { useState } from 'react';
import Footer from './component/Footer'

function App() {
  // const [order, setOrder] = useState('favorite');
  // const [bestItem, setBestItem] = useState([]);

  return (
    <div>
      <Nav />
      <Footer />
    </div>
  )
}

export default App;