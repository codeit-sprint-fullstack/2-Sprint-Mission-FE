import { Link, NavLink } from 'react-router-dom';
import GnbLogoImg from '../../assets/images/logo_gnb.png';
import GnbLogoImgMobile from '../../assets/images/logo_gnb_m.png';
import UserProfileImg from '../../assets/images/user_profile.png';
import './Nav.css';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? 'var(--primary-color)' : 'var(--nav-text-color)'
  }
}
function Nav() {
  const isLoggedIn = false; // 현재는 임시로 로그인 안 된 상태로 설정

  return (
  <div className="gnb-wrapper">
    <div className="gnb">
      <div className="gnb__logo">
        <Link to="/">
          <img src={GnbLogoImg} alt="Logo" className="gnb-logo-desktop" />
          <img src={GnbLogoImgMobile} alt="Logo"  className="gnb-logo-mobile" />
        </Link>
      </div>
      <nav className="gnb__nav">
        <ul className="gnb__nav-list">
          <li><NavLink to="/">자유게시판</NavLink></li>
          <li><NavLink to="/items" style={getLinkStyle}>중고마켓</NavLink></li>
        </ul>
      </nav>

      <div className="gnb__user">
        {!isLoggedIn ? (
          <Link to="/login" className="gnb__btn-login">로그인</Link>
        ) : (
          <div className="gnb__user-info">
            <img src={UserProfileImg} alt="User" className="user-profile-img" />
            <span className="user-name">김코드</span>
          </div>
        )
        }
      </div>
    </div>
  </div>    
  )
}

export default Nav;