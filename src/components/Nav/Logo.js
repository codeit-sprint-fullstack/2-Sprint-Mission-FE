import logoImg from "./img/logo-face.png";
import styles from "./Logo.module.css";
function Logo({ className }) {
  return (
    <a className={`${className} ${styles.logo}`} href="/">
      <img className={styles.image} src={logoImg} alt="로고 이미지" />
      <div className={styles.text}>판다마켓</div>
    </a>
  );
}
export default Logo;
