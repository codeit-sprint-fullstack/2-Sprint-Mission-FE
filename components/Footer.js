import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContents}>
        <div className={styles.footerVersion}>©codeit - 2024</div>
        <div className={styles.footerButtons}>
          <span className={styles.footerButtonText}>Privacy Policy</span>
          <span className={styles.footerButtonText}>FAQ</span>
        </div>
        <div className={styles.footerIcons}>
          <Link href="https://www.facebook.com">
            <Image
              src="/ic_facebook.png"
              width="17"
              height="17"
              alt="facebook"
            />
          </Link>
          <Link href="https://www.instagram.com">
            <Image
              src="/ic_instagram.png"
              width="17"
              height="17"
              alt="instagram"
            />
          </Link>
          <Link href="https://www.twitter.com">
            <Image 
							src="/ic_twitter.png" 
							width="17" 
							height="17" 
							alt="twitter" />
          </Link>
          <Link href="https://www.youtube.com">
            <Image 
							src="/ic_youtube.png" 
							width="17" 
							height="17" 
							alt="youtube" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
