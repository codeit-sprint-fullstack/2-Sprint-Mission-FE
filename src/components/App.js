import './App.css';
import Nav from './Nav/Nav';
import Container from './Container';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default App;
