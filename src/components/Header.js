import React from "react";
import logoImg from "../images/icon/pandalogo.svg";
import userIcon from "../images/etc/userIcon.svg";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <div class="logo">
            <a href="/">
              <img src={logoImg} alt="판다마켓 로고" />
            </a>
          </div>
          <div class="board">
            <span id="free-board">
              <a href="">자유게시판</a>
            </span>
            <span id="used-market">
              <a href="">중고마켓 </a>
            </span>
          </div>
          <div className="user">
            <img src={userIcon} alt="유저 이미지" />
            김코드
          </div>
        </nav>
      </header>
    </>
  );
};
//로그인 html 해결해야함
export default Header;
