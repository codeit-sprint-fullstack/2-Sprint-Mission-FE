import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.FooterBox}>
      <div className={styles.FooterMenu}>
        <p className={styles.FooterCodeit}>@codeit - 2024</p>
        <div className={styles.FooterCenter}>
          <p>Public Policy</p>
          <p>FAQ</p>
        </div>
        <div className={styles.FooterSocialImg}>
          <Link href="https://facebook.com" target="_blank">
            <img
              src="/facebook.png"
              alt="facebook"
              className={styles.FooterImage}
            />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <img
              src="/instagram.png"
              alt="instagram"
              className={styles.FooterImage}
            />
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <img
              src="/twitter.png"
              alt="twitter"
              className={styles.FooterImage}
            />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <img
              src="/youtube.png"
              alt="youtube"
              className={styles.FooterImage}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
