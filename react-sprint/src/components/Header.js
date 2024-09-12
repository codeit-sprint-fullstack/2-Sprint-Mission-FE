import { useState, useEffect } from "react";
import "./Header.css";
import logoImg from "../assets/logoImg.svg";
import mobileLogoImg from "../assets/mobileLogoImg.svg";
import userAvatar from "../assets/userImg.svg";

export default function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 743;
  const isTablet = windowWidth >= 744 && windowWidth < 1200;

  return (
    <header>
      <a className="logo" href="/" target="_self">
        <img id="logo" alt="logo" src={isMobile ? mobileLogoImg : logoImg} />
      </a>
      <nav className="navbar">
        <ul className="navbarMenu">
          <li>
            <a className="navbarList" href="/자유게시판">
              자유게시판
            </a>
          </li>
          <li>
            <a className="navbarList" href="/중고마켓" target="_self">
              중고마켓
            </a>
          </li>
        </ul>
      </nav>
      <div className="user">
        {isTablet || isMobile ? (
          <img alt="userAvatar" src={userAvatar} />
        ) : (
          <a href="/login" target="_self">
            <button className="userBtn">로그인</button>
          </a>
        )}
        <p className="userName">{isTablet ? "김코드" : ""}</p>
      </div>
    </header>
  );
}
