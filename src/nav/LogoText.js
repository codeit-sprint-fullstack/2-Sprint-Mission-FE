import styles from "./LogoText.module.css";
function LogoText({ className }) {
  return <div className={`${styles.logoText} ${className}`}>판다마켓</div>;
}
export default LogoText;
