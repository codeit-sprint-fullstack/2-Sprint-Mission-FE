import React from "react";
import logoImg from "./images/icon/pandalogo.png";

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
          <a href="login.html">
            <div id="loginbtn" class="button">
              로그인
            </div>
          </a>
        </nav>
      </header>
    </>
  );
};
//로그인 html 해결해야함
export default Header;
