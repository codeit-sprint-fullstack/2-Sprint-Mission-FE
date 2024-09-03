import '../css/Footer.css';
import facebookIcon from '../Image/ic_facebook.png';
import twitterIcon from '../Image/ic_twitter.png';
import youtubeIcon from '../Image/ic_youtube.png';
import instagramIcon from '../Image/ic_instagram.png';

function Footer() {
  return (
    <footer>
      <div>
        <p>©codeit - 2024</p>
      </div>
      <div className="footer-link">
        <a href="../privacy/">Privacy Policy</a>
        <a href="../faq/">FAQ</a>
      </div>
      <div className="sns-link">
        <a href="https://www.facebook.com/">
          <img src={facebookIcon} alt="facebook" />
        </a>
        <a href="https://twitter.com/home">
          <img src={twitterIcon} alt="twitter" />
        </a>
        <a href="https://www.youtube.com/">
          <img src={youtubeIcon} alt="youtube" />
        </a>
        <a href="https://www.instagram.com/">
          <img src={instagramIcon} alt="instagram" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
