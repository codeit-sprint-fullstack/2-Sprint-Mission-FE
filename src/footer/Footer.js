import styles from "./Footer.module.css";
import FooterBar from "./FooterBar.js";
function Footer() {
  return (
    <div className={styles.footer}>
      <FooterBar className={styles.margin} />
      {/*margin-top: 32px left,right:200px*/}
    </div>
  );
}
export default Footer;
