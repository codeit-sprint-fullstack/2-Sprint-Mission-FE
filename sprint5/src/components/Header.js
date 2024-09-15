import siteLogo from '../images/logo.png';
import mobileLogo from '../images/Property 1=Typo.png';
import styles from '../css/Header.module.css';
import { Link, NavLink } from 'react-router-dom';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? '#3692ff' : ''
  };
}

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/">
            <img className={styles.logo} src={siteLogo} alt="사이트 로고" />
            <img
              className={styles.mobile}
              src={mobileLogo}
              alt="모바일 사이트 로고"
            />
          </Link>
          <ul className={styles.menu}>
            <li>
              <NavLink to="/">자유게시판</NavLink>
            </li>
            <li>
              <NavLink to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to="/login" className={styles.auth}>
          로그인
        </Link>
      </div>
    </div>
  );
}
