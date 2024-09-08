import styles from "./NavMenu.module.css";
function NavMenu({ name }) {
  return <div className={styles.menu}>{name}</div>;
}
export default NavMenu;
