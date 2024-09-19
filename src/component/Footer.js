import "../css/Footer.css";
import facebookIC from "../assets/img/ic_facebook.png";
import twitterIC from "../assets/img/ic_twitter.png";
import youtubeIC from "../assets/img/ic_youtube.png";
import instagramIC from "../assets/img/ic_instagram.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-icon">
        <p className="codeit">@codeit - 2024</p>
        <div className="PF">
          <p className="privacy">
            <Link to="/privacy">Privacy Policy</Link>
          </p>
          <p className="FAQ">
            <Link to="/faq">FAQ</Link>
          </p>
        </div>
        <div className="icon">
          <Link to="https://www.facebook.com/" target="_blank" title="Facebook" rel="noopener noreferrer">
            <img src={facebookIC} alt="Facebook Icon" />
          </Link>
          <Link to="https://twitter.com/" target="_blank" title="Twitter" rel="noopener noreferrer">
            <img src={twitterIC} alt="Twitter Icon" />
          </Link>
          <Link to="https://www.youtube.com/" target="_blank" title="YouTube" rel="noopener noreferrer">
            <img src={youtubeIC} alt="YouTube Icon" />
          </Link>
          <Link to="https://www.instagram.com/" target="_blank" title="Instagram" rel="noopener noreferrer">
            <img src={instagramIC} alt="Instagram Icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
