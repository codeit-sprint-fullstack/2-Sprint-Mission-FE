import createButton from '../components/Button';
import logoImg from "../assets/logo_1.png";
import logoText from "../assets/logo_2.png";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "#3692FF" : "",
  };
}

const LoginButton = createButton({
  style: "btn_small_40"
})

function Nav() {
  return (
    <nav>
      <div className={styles.navContents}>
        <div className={styles.navLeft}>
          <NavLink to={"/"}>
            <div className={styles.logoImg}>
              <img className={styles.logo1} src={logoImg} alt="logo" />
              <img className={styles.logo2} src={logoText} alt="logo" />
            </div>
          </NavLink>
          <div className={styles.menu}>
            <p>자유게시판</p>
            <NavLink
              className={styles.navLinkStyle}
              to={"/items"}
              style={getLinkStyle}
            >
              <p>중고마켓</p>
            </NavLink>
          </div>
        </div>
        <div className={styles.navRight}>
          <LoginButton>로그인</LoginButton>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
