import facebook from "../assets/ic_facebook.svg";
import instagram from "../assets/ic_instagram.svg";
import twitter from "../assets/ic_twitter.svg";
import youtube from "../assets/ic_youtube.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-icon">
        <p className="codeit">@codeit - 2024</p>
        <div className="menu">
          <p className="Privacy">
            <a href="/privacy" className="Privacy-a">
              Privacy Policy
            </a>
          </p>
          <p className="FAQ">
            <a href="/faq" className="FAQ-a">
              FAQ
            </a>
          </p>
        </div>
        <div class="icon">
          <a href="https://www.facebook.com/" target="_blank" title="facebook">
            <img src={facebook} alt="Facebook Icon" />
          </a>
          <a href="https://twitter.com/" target="_blank" title="twitter">
            <img src={twitter} alt="Twitter Icon" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" title="youtube">
            <img src={youtube} alt="Youtube Icon" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            title="instagram"
          >
            <img src={instagram} alt="Instagram Icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
