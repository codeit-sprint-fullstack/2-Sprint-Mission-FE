import './App.css';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation(); // 현재 경로 가져오기

  // 현재 경로가 '/items'인 경우에만 'content' 클래스를 추가
  const isHomepage = location.pathname === '/';
  return (
    <>
      <Nav />
      <main className={`with-header ${isHomepage ? '' : 'content'}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;
