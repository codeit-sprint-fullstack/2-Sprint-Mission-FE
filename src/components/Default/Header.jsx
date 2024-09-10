import React from "react";
import logoImg from "../../images/icon/pandalogo.svg";
import userIcon from "../../images/etc/userIcon.svg";
import "./HeaderFooter.css";

function Header() {
  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <a href="/">
              <img src={logoImg} alt="판다마켓 로고" />
            </a>
          </div>
          <div className="board">
            <span id="free-board">
              <a href="">자유게시판</a>
            </span>
            <span id="used-market">
              <a href="">중고마켓 </a>
            </span>
          </div>
        </nav>
        <div className="user">
          <img src={userIcon} alt="유저 이미지" />
          김코드
        </div>
      </header>
    </>
  );
}

export default Header;
