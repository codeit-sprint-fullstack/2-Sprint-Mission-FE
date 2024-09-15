import React from "react";
import logoImg from "./images/logo.png";

const Header = () => (
    <header>
        <div className="title">
            <a href="/">
                <img id="logo" src={logoImg}  alt="판다마켓 로고" />
            </a>
            <h1>판다마켓</h1>
        </div>
        <button class="login">
            <a href="/login">로그인</a>
        </button>
    </header>
);

export default Header;