import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Header.css";

function Header() {
  const navigate = useNavigate();

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
        <button className="loginButton" onClick={() => navigate("/login")}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Header;
