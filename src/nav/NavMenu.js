import styles from "./NavMenu.module.css";
import { NavLink } from "react-router-dom";
function NavMenu({ children, to }) {
  function getLinkStyle({ isActive }) {
    return {
      color: isActive ? "#3692FF" : "#4B5563"
    };
  }
  return (
    <NavLink to={to} style={getLinkStyle}>
      <li className={styles.menu}>{children}</li>
    </NavLink>
  );
}
export default NavMenu;
