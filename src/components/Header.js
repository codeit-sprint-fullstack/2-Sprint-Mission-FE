import '../css/Header.css';
import logoImg from '../Image/logo.png';

function Header() {
  return (
    <header>
      <a href="/">
        <img id="pandaLogo" src={logoImg} alt="판다마켓 로고" />
      </a>
      <nav id="topNav">
        <a href="/">자유게시판</a>
        <a href="/">중고마켓</a>
      </nav>
      <a href="./login/" id="loginButton" className="button">
        로그인
      </a>
    </header>
  );
}

export default Header;
