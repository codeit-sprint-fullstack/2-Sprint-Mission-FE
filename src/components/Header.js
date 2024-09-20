import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImg from '../assets/Group 19.svg';
import mobileLogoImg from '../assets/판다마켓.svg';
import userAvatar from '../assets/Frame 2609463.svg';

const Header = () => {
  useEffect(() => {
    const updateUI = () => {
      const logo = document.getElementById('logo');
      const userId = document.getElementById('userId');
      const viewportWidth = window.innerWidth;

      // 로고 이미지 변경
      if (logo) {
        logo.src = viewportWidth <= 743 ? mobileLogoImg : logoImg;
      }

      // 사용자 아이디 텍스트 변경
      if (userId) {
        userId.textContent = viewportWidth <= 743 ? '' : '김코드';
      }
    };

    window.addEventListener('resize', updateUI);
    window.addEventListener('load', updateUI);

    updateUI();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', updateUI);
      window.removeEventListener('load', updateUI);
    };
  }, []);

  return (
    <header>
      <Link className="logo" to="/">
        <img id="logo" alt="logo" src={logoImg} />
      </Link>
      <nav className="navbar">
        <ul className="navbar_menu">
          <li><Link className="navbar_menu_li" to="/자유게시판">자유게시판</Link></li>
          <li><Link className="navbar_menu_li" to="/items">중고마켓</Link></li>
        </ul>
      </nav>
      <div className="user">
        <img id="userAvatar" alt="userAvatar" src={userAvatar} />
        <p id="userId">김코드</p>
      </div>
    </header>
  );
};

export default Header;
