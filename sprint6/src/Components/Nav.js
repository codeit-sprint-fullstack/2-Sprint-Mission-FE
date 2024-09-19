import "./Nav.css";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../assets/pndamarket_logo.png";
import logoText from "../assets/pandamarket_text_logo.png";
import React from "react";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "#3692FF" : undefined,
  };
}

export default function Nav() {
  const [logoSrc, setLogoSrc] = useState(logoImg); // 기본 로고 이미지

  const topics = [
    { title: "자유게시판", id: "board", link: "/freeboard" },
    { title: "중고마켓", id: "secondmarket", link: "items" },
  ];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 375 && window.innerWidth <= 743) {
        setLogoSrc(logoText);
      } else {
        setLogoSrc(logoImg);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav>
      <div className="container">
        <div className="logoMenu">
          <Link to="/">
            <img id="logo" alt="Panadamarket CI" src={logoSrc} />
          </Link>
          {topics.map((topic) => (
            <p key={topic.id} className="menu">
              <NavLink to={topic.link} style={getLinkStyle}>
                {topic.title}
              </NavLink>
            </p>
          ))}
        </div>
        <Link to="/login">
          <button className="login">로그인</button>
        </Link>
      </div>
    </nav>
  );
}
