import { Link } from 'react-router-dom'
import styles from'./Footer.module.css'
import facebookIc from '../image/ic_facebook.png'
import twitterIc from '../image/ic_twitter.png'
import youtubeIc from '../image/ic_youtube.png'
import instagramIc from '../image/ic_instagram.png'

export default function Footer() {
  return (
    <footer>
      <div className={styles.company}>
        ©codeit - 2024
      </div>
      <div className={styles.footerMenu}>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <div className={styles.snsLink}>
        <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src={facebookIc} alt="페이스북" /></Link>
        <Link to="https://twitter.com/" target="_blank" rel="noopener noreferrer"><img src={twitterIc} alt="트위터" /></Link>
        <Link to="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><img src={youtubeIc} alt="유튜브" /></Link>
        <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img src={instagramIc} alt="인스타그램" /></Link>
      </div>
    </footer>
  );
}