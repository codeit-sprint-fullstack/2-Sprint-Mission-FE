import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.copy}>&copy;codeit - 2024</h3>
      <div className={styles.notice}>
        <h3>Privacy Policy</h3>
        <h3>FAQ</h3>
      </div>
      <div className={styles.logoContainer}>
        <div className={styles.logoImg}>
          <Image fill src="/images/ic_facebook.svg" alt="페이스북 로고" />
        </div>
        <div className={styles.logoImg}>
          <Image fill src="/images/ic_twitter.svg" alt="트위터 로고" />
        </div>
        <div className={styles.logoImg}>
          <Image fill src="/images/ic_youtube.svg" alt="유투브 로고" />
        </div>
        <div className={styles.logoImg}>
          <Image fill src="/images/ic_instagram.svg" alt="인스타그램 로고" />
        </div>
      </div>
    </footer>
  );
}
