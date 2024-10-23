import Link from "next/link";
import Image from "next/image";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.codeit}>@codeit-2024</div>
      <div>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <div>
        <Link href="https://www.facebook.com/?locale=ko_KR">
          <Image
            src="/facebookIcon.png"
            className={styles.facebookIcon}
            alt="facebookIcon"
            width={18}
            height={18}
          />
        </Link>
        <Link href="https://x.com/?lang=ko">
          <Image
            src="/twitterIcon.png"
            className={styles.twitterIcon}
            alt="twitterIcon"
            width={18}
            height={18}
          />
        </Link>
        <Link href="https://www.youtube.com/">
          <Image
            src="/youtubeIcon.png"
            className={styles.youtubeIcon}
            alt="youtubeIcon"
            width={18}
            height={18}
          />
        </Link>
        <Link href="https://www.instagram.com/">
          <Image
            src="/instagramIcon.png"
            className={styles.instagramIcon}
            alt="instagramIcon"
            width={18}
            height={18}
          />
        </Link>
      </div>
    </div>
  );
}
