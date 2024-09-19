import Logo from "./Logo.js";
import NavMenuBar from "./NavMenuBar.js";
import NavMenu from "./NavMenu.js";
import Profile from "./Profile.js";
import styles from "./Nav.module.css";
function Nav({ className }) {
  return (
    <nav className={`${className} ${styles.nav}`}>
      <Logo className={styles.logo} />
      <NavMenuBar className={styles.menuBar}>
        <>자유게시판</>
        <>중고마켓</>
      </NavMenuBar>
      <Profile id="profile" className={styles.profile} />
    </nav>
  );
}
export default Nav;
