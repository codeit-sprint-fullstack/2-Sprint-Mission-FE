import './Footer.css';
import FacebookIcon from '../../assets/images/icon/ic_facebook.png';
import TwitterIcon from '../../assets/images/icon/ic_twitter.png';
import YoutubeIcon from '../../assets/images/icon/ic_youtube.png';
import InstagramIcon from '../../assets/images/icon/ic_instagram.png';

function Footer() {
  return (
  <footer className="footer-wrapper">
    <div className="footer-contents">
      <div id="copyright">©codeit - 2024</div>
      <div id="privacy-faq">
        <ul className="footer-privacy-faq">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
      </div>
      <div id="sns">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={FacebookIcon} alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={TwitterIcon}  alt="Twitter" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={YoutubeIcon}  alt="Youtube" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={InstagramIcon}  alt="Instagram" />
        </a>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
