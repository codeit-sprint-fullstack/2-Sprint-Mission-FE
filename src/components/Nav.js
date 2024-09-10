import logoImg from "../assets/logo_1.png";
import logoText from "../assets/logo_2.png";
import profileImg from "../assets/profile-icon.png";
import Container from "./Container";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav>
      <div className={styles.navContents}>
        <div className={styles.navLeft}>
          <div className={styles.logoImg}>
            <img className={styles.logo1} src={logoImg} alt="logo" />
            <img className={styles.logo2} src={logoText} alt="logo" />
          </div>
          <div className={styles.menu}>
            <p>자유게시판</p>
            <p>중고마켓</p>
          </div>
        </div>
        <div className={styles.navRight}>
          <img className={styles.profileImg} src={profileImg} alt="profile" />
          <p>김코드</p>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
