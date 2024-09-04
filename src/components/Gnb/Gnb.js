import GnbLogoImg from '../assets/images/logo_gnb.png';
import GnbLogoImgMobile from '../assets/images/logo_gnb_m.png';
import UserProfileImg from '../assets/images/user_profile.png';
import './Gnb.css';

function Gnb() {
  return (
    <header className="gnb-wrapper">
    <div className="gnb">
      <div className="gnb__logo">
        <a href="/">
          <img src={GnbLogoImg} alt="Logo" className="gnb-logo-desktop" />
          <img src={GnbLogoImgMobile} alt="Logo"  className="gnb-logo-mobile" />
        </a>
      </div>
      <nav className="gnb__nav">
        <ul className="gnb__nav-list">
          <li><a href="/">자유게시판</a></li>
          <li><a href="/">중고마켓</a></li>
        </ul>
      </nav>

      <div className="gnb__user">
        <a href="/login" className="gnb__btn-login">로그인</a>
        <div className="gnb__user-info">
          <img src={UserProfileImg} alt="User" className="user-profile-img" />
          <span className="user-name">김코드</span>
        </div>
      </div>
    </div>
  </header>    
  )
}

export default Gnb;