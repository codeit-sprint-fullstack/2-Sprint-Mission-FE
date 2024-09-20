import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";

function Header() {
  return (
    <div className="nav">
      <div className="navLeft">
        <div className="logo">
          <Link to="/">
            <img
              className="logoImg"
              src="/img/logoImg.png"
              alt="판다마켓 로고"
            />
          </Link>
        </div>
        <div>
          <Link className="community" to="/community">
            자유게시판
          </Link>
          <Link className="market" to="/items">
            중고마켓
          </Link>
        </div>
      </div>
      <div className="login">
        <a href="/login">
          <button className="loginButton">로그인</button>
        </a>
      </div>
    </div>
  );
}

export default Header;
