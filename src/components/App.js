// import BestProduct from './BestProduct';
// import SalesProduct from './SalesProduct';
import Footer from './Footer.js';
import Nav from './Nav.js'
import { Outlet } from 'react-router-dom';
import styles from './App.module.css'

export default function App() {


  return (
    <div >
      <Nav />
      <div className={styles.page}><Outlet /></div>
      <Footer />
    </div>
  );
}