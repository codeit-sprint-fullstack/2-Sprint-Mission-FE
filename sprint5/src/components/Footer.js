import facebook from '../images/ic_facebook.png';
import twitter from '../images/ic_twitter.png';
import youtube from '../images/ic_youtube.png';
import instagram from '../images/ic_instagram.png';
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-elements">
          <div className="footer-info">@codeit-2024</div>
          <div className="footer-customer-service">
            <a href="./privacy">Privacy Policy</a>
            <a href="./faq">FAQ</a>
          </div>
          <div className="sns">
            <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
              <img className="sns-logo" src={facebook} alt="페이스북" />
            </a>
            <a href="https://x.com/?lang=ko" target="_blank">
              <img className="sns-logo" src={twitter} alt="트위터" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <img className="sns-logo" src={youtube} alt="유튜브" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img className="sns-logo" src={instagram} alt="인스타그램" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
