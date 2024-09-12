import { Link, NavLink } from 'react-router-dom';
import style from './css/Header.module.css';
import logoImg from '../Image/logo.png';
import smallLogoImg from '../Image/small_logo.png';
import { useViewport, VIEWPORT } from '../contexts/ViewportContext.js';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? '#3692ff' : undefined
  };
}

function Header() {
  const viewport = useViewport();
  return (
    <header>
      <Link to="/">
        <img
          id={`${style.pandaLogo}`}
          src={viewport === VIEWPORT.MOBILE ? smallLogoImg : logoImg}
          alt="판다마켓 로고"
        />
      </Link>
      <nav id={`${style.topNav}`}>
        <NavLink to="/free" style={getLinkStyle}>
          자유게시판
        </NavLink>
        <NavLink to="/items" style={getLinkStyle}>
          중고마켓
        </NavLink>
      </nav>
      <Link to="/login/" id={`${style.loginButton}`} className="button">
        로그인
      </Link>
    </header>
  );
}

export default Header;
