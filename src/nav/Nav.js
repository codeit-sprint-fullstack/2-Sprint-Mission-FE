import styles from "./Nav.module.css";
import Logo from "./Logo.js";
import NavMenuBar from "./NavMenuBar.js";
import LoginOrProfile from "./LoginOrProfile.js";
function Nav({ className }) {
  return (
    <div className={`${styles.nav} ${className}`}>
      {/* justify-between */}
      <Logo className={styles.marginLeft} /> {/*200px 24px 16px*/}
      <NavMenuBar className={styles.navMarginLeft} />
      <LoginOrProfile className={styles.marginRight} />
      {/*200px 24px 16px*/}
    </div>
  );
}
export default Nav;
