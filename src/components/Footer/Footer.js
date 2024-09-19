import FooterBar from "./FooterBar.js";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <div id="footer" className={styles.footer}>
      <FooterBar id="footer-bar" className={styles.footerBar} />
    </div>
  );
}
export default Footer;
