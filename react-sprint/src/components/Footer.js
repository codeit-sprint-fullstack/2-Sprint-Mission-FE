import "./Footer.css";
import icFacebook from "../assets/facebookImg.svg";
import icTwitter from "../assets/twitterImg.svg";
import icYoutube from "../assets/youtubeImg.svg";
import icInstagram from "../assets/instagranImg.svg";

export default function Footer() {
  return (
    <footer>
      <p className="codeit">&copy;codeit - 2024</p>
      <div className="menu">
        <a className="menuA" href="/privacy" target="_self">
          Privacy Policy
        </a>
        <a className="menuA" href="/faq" target="_self">
          FAQ
        </a>
      </div>
      <div className="snsImg">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icFacebook} alt="Facebook" />
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img src={icTwitter} alt="Twitter" />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icYoutube} alt="YouTube" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icInstagram} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
}
