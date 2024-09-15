import styles from "./FooterBar.module.css";
import FooterMenu from "./FooterMenu.js";
import facebook from "./image/ic_facebook.png";
import twitter from "./image/ic_twitter.png";
import youtube from "./image/ic_youtube.png";
import instagram from "./image/ic_instagram.png";

function FooterBar({ className }) {
  return (
    <div className={`${styles.footerBar} ${className}`}>
      <FooterMenu className={`${styles.text} ${styles.font}`} type="text">
        @codeit-2024
      </FooterMenu>
      <div className={styles.textContainer}>
        <FooterMenu className={styles.font} type="linkText">
          Privacy
        </FooterMenu>
        <FooterMenu className={styles.font} type="linkText">
          FAQ
        </FooterMenu>
      </div>
      <div className={styles.imageContainer}>
        <FooterMenu type="linkImage" image={facebook}></FooterMenu>
        <FooterMenu type="linkImage" image={twitter}></FooterMenu>
        <FooterMenu type="linkImage" image={youtube}></FooterMenu>
        <FooterMenu type="linkImage" image={instagram}></FooterMenu>
      </div>
    </div>
  );
}
export default FooterBar;
