import { useState, useEffect } from "react";
import "./RendingHeader.css";
import logoImg from "../assets/logoImg.svg";
import mobileLogoImg from "../assets/mobileLogoImg.svg";
import { Link } from "react-router-dom";

export default function RendingHeader() {
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

  return (
    <header>
      <Link to="/">
        <img id="logo" alt="logo" src={isMobile ? mobileLogoImg : logoImg} />
      </Link>
      <div className="user">
        <a href="/login" target="_self">
          <button className="userBtn">로그인</button>
        </a>
      </div>
    </header>
  );
}
