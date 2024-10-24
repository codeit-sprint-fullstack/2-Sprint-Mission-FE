import FacebookIcon from '@/public/images/ic_facebook.png';
import TwitterIcon from '@/public/images/ic_twitter.png';
import YoutubeIcon from '@/public/images/ic_youtube.png';
import InstagramIcon from '@/public/images/ic_instagram.png';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContents}>
        <div className={styles.copyright}>©codeit - 2024</div>
        <div className={styles.privacyFaq}>
          <ul className={styles.footerPrivacyFaq}>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className={styles.sns}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.iconWrapper}>
              <Image src={FacebookIcon} fill alt="Facebook" sizes="2rem" /> 
            </div>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.iconWrapper}>
              <Image src={TwitterIcon} fill alt="Twitter" sizes="2rem" />
            </div>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.iconWrapper}>
              <Image src={YoutubeIcon} fill alt="Youtube" sizes="2rem" />
            </div>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.iconWrapper}>
            <Image src={InstagramIcon} fill alt="Instagram" sizes="2rem" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
