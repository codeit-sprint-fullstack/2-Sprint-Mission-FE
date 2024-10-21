import styles from '../css/Footer.module.css';
import facebook from '../images/ic_facebook.png';
import twitter from '../images/ic_twitter.png';
import youtube from '../images/ic_youtube.png';
import instagram from '../images/ic_instagram.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>@codeit-2024</div>
        <div className={styles.service}>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className={styles.sns}>
          <Link to="https://www.facebook.com/?locale=ko_KR" target="_blank">
            <img className={styles.snsLogo} src={facebook} alt="페이스북" />
          </Link>
          <Link to="https://x.com/?lang=ko" target="_blank">
            <img className={styles.snsLogo} src={twitter} alt="트위터" />
          </Link>
          <Link to="https://www.youtube.com/" target="_blank">
            <img className={styles.snsLogo} src={youtube} alt="유튜브" />
          </Link>
          <Link to="https://www.instagram.com/" target="_blank">
            <img className={styles.snsLogo} src={instagram} alt="인스타그램" />
          </Link>
        </div>
      </div>
    </div>
  );
}
