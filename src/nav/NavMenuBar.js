import styles from "./NavMenuBar.module.css";
import NavMenu from "./NavMenu.js";
function NavMenuBar({ className }) {
  return (
    <div className={`${styles.menuBar} ${className}`}>
      <NavMenu>자유게시판</NavMenu>
      <NavMenu>중고마켓</NavMenu>
    </div>
  );
}
export default NavMenuBar;
