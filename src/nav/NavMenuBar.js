import styles from "./NavMenuBar.module.css";
import NavMenu from "./NavMenu.js";
function NavMenuBar({ className }) {
  return (
    <ul className={`${styles.menuBar} ${className}`}>
      <NavMenu to="/freeboard">자유게시판</NavMenu>
      <NavMenu to="/items">중고마켓</NavMenu>
    </ul>
  );
}
export default NavMenuBar;
