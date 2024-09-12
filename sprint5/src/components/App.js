import Header from './Header';
import Footer from './Footer';
import '../css/App.css';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
