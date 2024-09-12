import './Footer.css';
import FacebookIcon from '../../assets/images/icon/ic_facebook.png';
import TwitterIcon from '../../assets/images/icon/ic_twitter.png';
import YoutubeIcon from '../../assets/images/icon/ic_youtube.png';
import InstagramIcon from '../../assets/images/icon/ic_instagram.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
  <footer className="footer-wrapper">
    <div className="footer-contents">
      <div id="copyright">©codeit - 2024</div>
      <div id="privacy-faq">
        <ul className="footer-privacy-faq">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>
      <div id="sns">
        <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={FacebookIcon} alt="Facebook" />
        </Link>
        <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={TwitterIcon}  alt="Twitter" />
        </Link>
        <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={YoutubeIcon}  alt="Youtube" />
        </Link>
        <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={InstagramIcon}  alt="Instagram" />
        </Link>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
