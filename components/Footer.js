import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";
import facebookIcon from "@/public/ic_facebook.svg";
import twitterIcon from "@/public/ic_twitter.svg";
import youtubeIcon from "@/public/ic_youtube.svg";
import instagramIcon from "@/public/ic_instagram.svg";

export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.copyright}>©codeit - 2024</div>
        <div className={styles.policyFaqWrapper}>
          <Link href="/privacy">
            <span className={styles.privacyPolicy}>Privacy Policy</span>
          </Link>
          <Link href="/faq">
            <span className={styles.faq}>FAQ</span>
          </Link>
        </div>
        <div className={styles.linkIcons}>
          <Link href="https://www.facebook.com">
            <Image
              src={facebookIcon}
              width="20"
              height="20"
              alt="facebookIcon"
            />
          </Link>
          <Link href="https://www.twitter.com">
            <Image src={twitterIcon} width="20" height="20" alt="twitterIcon" />
          </Link>
          <Link href="https://www.youtube.com">
            <Image src={youtubeIcon} width="20" height="20" alt="youtubeIcon" />
          </Link>
          <Link href="https://www.instagram.com">
            <Image
              src={instagramIcon}
              width="20"
              height="20"
              alt="instagramIcon"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
