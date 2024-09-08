import styles from "./FooterBar.module.css";
import FooterBarMenu from "./FooterBarMenu.js";
import facebookIcon from "./img/facebook.png";
import twitterIcon from "./img/twitter.png";
import youtubeIcon from "./img/youtube.png";
import instagramIcon from "./img/instagram.png";

function FooterBar() {
  return (
    <div id="footer-bar" className={styles.footerBar}>
      <div className={styles.codeit}>
        <FooterBarMenu linkType={"none"} fontColor={"#9CA3AF"}>
          @Codeit-2024
        </FooterBarMenu>
      </div>
      <div id="footer-bar-menu-textbox" className={styles.textBox}>
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
      <div id="footer-bar-imgbox" className={styles.imgBox}>
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
