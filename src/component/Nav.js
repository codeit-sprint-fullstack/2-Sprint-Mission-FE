import logo from '../assets/img/panda.png';
import '../css/Nav.css';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isItemsPage = currentPath === '/items';

  return (
    <div className='header'>
      <div className="nav">
        <div className="logo-title">
          <Link to='/'>
            <img className="logo" src={logo} alt="panda icon" />
          </Link>
          <Link to='/'>
            <h1 className="title">판다마켓</h1>
          </Link>
          <Link className='page' to='/'>자유게시판</Link>
          <Link className={`page ${isItemsPage ? 'active' : ''}`} to='/items'>중고마켓</Link>
        </div>
        <Link to='/login'>
          <button className="login">로그인</button>
        </Link>
      </div>
    </div>
  );
}
