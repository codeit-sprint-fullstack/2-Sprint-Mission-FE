import React from "react";
import "../style/Header.css";

function Header() {
  return (
    <div className="nav">
      <div className="navLeft">
        <div className="logo">
          <a href="/">
            <img
              className="logoImg"
              src="/img/logoImg.png"
              alt="판다마켓 로고"
            />
          </a>
        </div>
        <div>
          <a className="market" href="/">
            중고마켓
          </a>
          <a className="community" href="/community">
            자유게시판
          </a>
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
