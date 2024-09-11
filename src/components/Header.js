import React, { useEffect } from 'react';
import './Header.css';
import logoImg from './img/Group 19.svg';
import mobileLogoImg from './img/판다마켓.svg';
import userAvatar from './img/Frame 2609463.svg';

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

    // 페이지 로드 및 리사이즈 시 UI 업데이트
    window.addEventListener('resize', updateUI);
    window.addEventListener('load', updateUI);

    // 최초 호출로 UI 업데이트
    updateUI();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', updateUI);
      window.removeEventListener('load', updateUI);
    };
  }, []);

  return (
    <header>
      <a className="logo" href="/" target="_self">
        <img id="logo" alt="logo" src={logoImg} />
      </a>
      <nav className="navbar">
        <ul className="navbar_menu">
          <li><a className="navbar_menu_li" href="/자유게시판" target="_self">자유게시판</a></li>
          <li><a className="navbar_menu_li" href="/중고마켓" target="_self">중고마켓</a></li>
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
