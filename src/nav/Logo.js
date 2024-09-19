import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";
import LogoImage from "./LogoImage.js";
import LogoText from "./LogoText.js";
function Logo({ className }) {
  return (
    <NavLink to="/">
      <div className={`${styles.logo} ${className}`}>
        <LogoImage />
        <LogoText className={styles.marginLeft} />
      </div>
    </NavLink>
  );
}
export default Logo;
