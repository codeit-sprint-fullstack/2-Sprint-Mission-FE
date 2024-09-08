import logo from "../assets/img/Property_1=sm.png";
import "../css/Nav.css";

function Nav() {
  return (
    <header>
      <div className="nav">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="link_mainpage"></img>
          </a>
        </div>
        <div className="quickLink">
          <a href="/" style={{ textDecoration: "none" }}>
            자유게시판
          </a>
        </div>
        <div className="quickLink">
          <a href="/" style={{ textDecoration: "none" }}>
            중고마켓
          </a>
        </div>
        <button className="loginButton">
          <a href="/login" style={{ textDecoration: "none" }}>
            로그인
          </a>
        </button>
      </div>
    </header>
  );
}

export default Nav;
