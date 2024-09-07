import siteLogo from '../images/logo.png';
import userIcon from '../images/size=large.png';
import '../css/Header.css';

export default function Header() {
  return (
    <header>
      <div className="top-bar">
        <div className="top-bar-elements">
          <div className="menu-left">
            <img className="site-logo" src={siteLogo} alt="사이트 로고" />
            <div className="menu">
              <p>자유게시판</p>
              <p>중고마켓</p>
            </div>
          </div>
          <a class="auth" href="./login">
            로그인
          </a>
        </div>
      </div>
    </header>
  );
}
