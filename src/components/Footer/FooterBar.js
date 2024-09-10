import styles from "./FooterBar.module.css";
import FooterBarMenu from "./FooterBarMenu.js";
import facebookIcon from "./img/facebook.png";
import twitterIcon from "./img/twitter.png";
import youtubeIcon from "./img/youtube.png";
import instagramIcon from "./img/instagram.png";

function FooterBar({ className }) {
  return (
    <div className={`${className} ${styles.footerBar}`}>
      <FooterBarMenu
        linkType={"none"}
        fontColor={"#9CA3AF"}
        className={styles.codeit}
      >
        @Codeit-2024
      </FooterBarMenu>
      <div className={styles.textBox}>
        <FooterBarMenu
          className="footer-bar-menu-text"
          linkType={"html"}
          address={"privacy.html"}
          fontColor={"#E5E7EB"}
        >
          Privacy Policy
        </FooterBarMenu>
        <FooterBarMenu
          className="footer-bar-menu-html"
          linkType={"html"}
          address={"faq.html"}
          fontColor={"#E5E7EB"}
        >
          FAQ
        </FooterBarMenu>
      </div>
      <div className={styles.imgBox}>
        <FooterBarMenu
          className="footer-bar-menu-img"
          linkType={"web"}
          address={"https://www.facebook.com"}
          img={facebookIcon}
        ></FooterBarMenu>
        <FooterBarMenu
          className="footer-bar-menu-img"
          linkType={"web"}
          address={"https://x.com"}
          img={twitterIcon}
        ></FooterBarMenu>
        <FooterBarMenu
          className="footer-bar-menu-img"
          linkType={"web"}
          address={"https://youtube.com"}
          img={youtubeIcon}
        ></FooterBarMenu>
        <FooterBarMenu
          className="footer-bar-menu-img"
          linkType={"web"}
          address={"https://www.instagram.com/"}
          img={instagramIcon}
        ></FooterBarMenu>
        {/* sns이미지링크 */}
      </div>
    </div>
  );
}
export default FooterBar;
