import styles from '@/components/Footer/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>@codeit-2024</div>
        <div className={styles.service}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className={styles.sns}>
          <Link href="https://www.facebook.com/?locale=ko_KR" target="_blank">
            <Image
              className={styles.snsLogo}
              src="/images/ic_facebook.png"
              width={18}
              height={18}
              alt="페이스북"
            />
          </Link>
          <Link href="https://x.com/?lang=ko" target="_blank">
            <Image
              className={styles.snsLogo}
              src="/images/ic_twitter.png"
              width={18}
              height={18}
              alt="트위터"
            />
          </Link>
          <Link href="https://www.youtube.com/" target="_blank">
            <Image
              className={styles.snsLogo}
              src="/images/ic_youtube.png"
              width={18}
              height={18}
              alt="유튜브"
            />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <Image
              className={styles.snsLogo}
              src="/images/ic_instagram.png"
              width={18}
              height={18}
              alt="인스타그램"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
