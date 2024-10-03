import logoFB from "../assets/ic_facebook.png";
import logoIG from "../assets/ic_instagram.png";
import logoTW from "../assets/ic_twitter.png";
import logoYT from "../assets/ic_youtube.png";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={styles.footerContents}>
        <div className={styles.footerVersion}>©codeit - 2024</div>
        <div className={styles.footerButtons}>
          <span className={styles.footerButtonText}>Privacy Policy</span>
          <span className={styles.footerButtonText}>FAQ</span>
        </div>
        <div className={styles.footerIcons}>
          <a href="https://www.facebook.com">
            <img src={logoFB} alt="facebook" />
          </a>
          <a href="https://www.instagram.com">
            <img src={logoIG} alt="instagram" />
          </a>
          <a href="https://www.twitter.com">
            <img src={logoTW} alt="twitter" />
          </a>
          <a href="https://www.youtube.com">
            <img src={logoYT} alt="youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
