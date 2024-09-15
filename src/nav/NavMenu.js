import styles from "./NavMenu.module.css";
function NavMenu({ children }) {
  return <div className={styles.menu}>{children}</div>;
}
export default NavMenu;
