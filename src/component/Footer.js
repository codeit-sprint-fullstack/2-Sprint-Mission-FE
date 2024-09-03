import "../css/Footer.css";
import facebookIC from "../assets/img/ic_facebook.png";
import twitterIC from "../assets/img/ic_twitter.png";
import youtubeIC from "../assets/img/ic_youtube.png";
import instagramIC from "../assets/img/ic_instagram.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer-icon">
        <p className="codeit">@codeit - 2024</p>
        <div className="PF">
          <p className="privacy">
            <a href="./privacy.html">Privacy Policy</a>
          </p>
          <p className="FAQ">
            <a href="./faq.html">FAQ</a>
          </p>
        </div>
        <div className="icon">
          <a href="https://www.facebook.com/" target="_blank" title="Facebook" rel="noopener noreferrer">
            <img src={facebookIC} alt="Facebook Icon" />
          </a>
          <a href="https://twitter.com/" target="_blank" title="Twitter" rel="noopener noreferrer">
            <img src={twitterIC} alt="Twitter Icon" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" title="YouTube" rel="noopener noreferrer">
            <img src={youtubeIC} alt="YouTube Icon" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" title="Instagram" rel="noopener noreferrer">
            <img src={instagramIC} alt="Instagram Icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
