import style from "./css/Footer.module.css";
import facebookIcon from "../Image/ic_facebook.png";
import twitterIcon from "../Image/ic_twitter.png";
import youtubeIcon from "../Image/ic_youtube.png";
import instagramIcon from "../Image/ic_instagram.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div>
        <p>©codeit - 2024</p>
      </div>
      <div className={`${style["footer-link"]}`}>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <div className={`${style["sns-link"]}`}>
        <Link to="https://www.facebook.com/">
          <img src={facebookIcon} alt="facebook" />
        </Link>
        <Link to="https://twitter.com/home">
          <img src={twitterIcon} alt="twitter" />
        </Link>
        <Link to="https://www.youtube.com/">
          <img src={youtubeIcon} alt="youtube" />
        </Link>
        <Link to="https://www.instagram.com/">
          <img src={instagramIcon} alt="instagram" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
