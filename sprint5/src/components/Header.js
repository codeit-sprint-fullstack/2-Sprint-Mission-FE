import siteLogo from '../images/logo.png';
import userIcon from '../images/size=large.png';
import mobileLogo from '../images/Property 1=Typo.png';
import '../css/Header.css';

export default function Header() {
  return (
    <header>
      <div className="top-bar">
        <div className="top-bar-elements">
          <div className="top-bar-left">
            <img className="site-logo" src={siteLogo} alt="사이트 로고" />
            <img
              className="mobile-logo"
              src={mobileLogo}
              alt="모바일 사이트 로고"
            />
            <div className="menu">
              <p>자유게시판</p>
              <p>중고마켓</p>
            </div>
          </div>
          <div className="top-bar-right">
            <a className="auth" href=".../login">
              로그인
            </a>
            <img className="user-icon" src={userIcon} />
            <span className="user-name">김코드</span>
          </div>
        </div>
      </div>
    </header>
  );
}
