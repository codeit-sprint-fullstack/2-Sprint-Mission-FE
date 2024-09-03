import logo from '../assets/img/판다 얼굴.png';
import '../css/Nav.css';

export default function Nav() {
  return (
    <div className='header'>
      <div className="nav">
        <div className="logo-title">
          <a href="/">
            <img className="logo" src={logo} alt="판다 얼굴" />
          </a>
          <a href="/">
            <h1 className="title">판다마켓</h1>
          </a>
        </div>
        <button className="login">
          <a href="./login/login.html">로그인</a>
        </button>
      </div>
    </div>
  );
}
