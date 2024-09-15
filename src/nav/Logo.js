import styles from "./Logo.module.css";
import LogoImage from "./LogoImage.js";
import LogoText from "./LogoText.js";
function Logo({ className }) {
  return (
    <div className={`${styles.logo} ${className}`}>
      <LogoImage />
      <LogoText className={styles.marginLeft} />
    </div>
  );
}
export default Logo;
