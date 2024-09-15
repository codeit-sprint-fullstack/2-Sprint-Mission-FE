import { Link, NavLink } from 'react-router-dom'
import logoImg from '../image/homepage_logo.png'
import logoText from '../image/logoText.png'
// import profileImg from '../image/profileImg.png'
import styles from './Nav.module.css'
import { useState, useEffect } from 'react'

function getLinkStyle({ isActive }) {
  return {
    color:  isActive ? 'var(--primary-color-100)' : undefined,
  }
}

export default function Nav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 743)

  useEffect(() => {
    const handleLogoChang = () => {
      setIsMobile(window.innerWidth <= 743);
    };

    window.addEventListener("resize", handleLogoChang);

    return () => {window.removeEventListener("resize", handleLogoChang);};
  }, []);

  return (
    <header className={styles.navHeader}>
      <div className={styles.logoAndMenu}>
        <Link to="/"><img id="logo" src={!isMobile ? logoImg : logoText} alt="판다마켓 로고" /></Link>
        <ul className={styles.navMenu}>
          <li><NavLink to='/bulletinboard' className={styles.menuList} style={getLinkStyle}>자유게시판</NavLink></li>
          <li><NavLink to='/items' className={styles.menuList} style={getLinkStyle}>중고마켓</NavLink></li>
        </ul>
      </div>
      <Link to="/login" className={styles.loginButton} >로그인</Link>
      {/* <div className={styles.user}>
        <img src={profileImg} alt="프로필이미지" />
        <p id={styles.userId} className={styles.profile}>김코드</p>
      </div> */}
    </header>
  );
}