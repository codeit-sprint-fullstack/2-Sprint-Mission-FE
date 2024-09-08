import facebookImg from "../assets/img/ic_facebook.png";
import twitterImg from "../assets/img/ic_twitter.png";
import youtubeImg from "../assets/img/ic_youtube.png";
import instagramImg from "../assets/img/ic_instagram.png";

function Footer() {
  return (
    <div className="footer-card">
      <div className="copy-right">@codeit-2024</div>
      <p className="privacy-faq">
        <a href="/privacy" style={{ textDecoration: "none" }}>
          Privacy Policy
        </a>
        <a href="/faq" style={{ textDecoration: "none" }}>
          FAQ
        </a>
      </p>
      <div className="sns">
        <a href="https://www.facebook.com/?locale=ko_KR">
          <img src={facebookImg} alt="facebook" />
        </a>
        <a href="https://x.com/home?lang=ko">
          <img src={twitterImg} alt="twitter" />
        </a>
        <a href="https://www.youtube.com/">
          <img src={youtubeImg} alt="youtube" />
        </a>
        <a href="https://www.instagram.com/">
          <img src={instagramImg} alt="instagram" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
