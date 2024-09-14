import siteLogo from '../images/logo.png';
import userIcon from '../images/size=large.png';
import mobileLogo from '../images/Property 1=Typo.png';
import '../css/Header.css';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  return (
    <header>
      <div className="top-bar">
        <div className="top-bar-elements">
          <div className="top-bar-left">
            <a href="/">
              <img className="site-logo" src={siteLogo} alt="사이트 로고" />
            </a>
            <img
              className="mobile-logo"
              src={mobileLogo}
              alt="모바일 사이트 로고"
            />
            <div className="menu">
              <p>자유게시판</p>
              <Link
                to="/items"
                className={location.pathname === '/items' ? 'active' : ''}
              >
                중고마켓
              </Link>
            </div>
          </div>
          <a className="auth" href="/login">
            로그인
          </a>
        </div>
      </div>
    </header>
  );
}
