import React from "react";
import logoImg from "../../images/icon/pandalogo.svg";

import "./HeaderFooter.css";

function Header() {
  // const handleMarketClick = () => {
  // navigation("/items");
  // };
  return (
    <header className="header">
      <div className="nav-wrapper">
        <img src={logoImg} alt="판다마켓 로고" className="header-logo" />
        <nav>
          <ul className="board">
            <li id="free-board">자유게시판</li>
            <li id="used-market">중고마켓</li>
          </ul>
        </nav>
      </div>

      <button type="click" className="loginLink button">
        로그인
      </button>
    </header>
  );
}

export default Header;
