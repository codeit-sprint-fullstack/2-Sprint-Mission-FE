import Link from "next/link";
import Image from "next/image";
import facebook from "@/public/ic_facebook.svg";
import instagram from "@/public/ic_instagram.svg";
import twitter from "@/public/ic_twitter.svg";
import youtube from "@/public/ic_youtube.svg";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_icon}>
        <p className={styles.codeit}>@codeit - 2024</p>
        <div className={styles.menu}>
          <Link href="/privacy" className={styles.privacy_a}>
            Privacy Policy
          </Link>
          <Link href="/faq" className={styles.faq_a}>
            FAQ
          </Link>
        </div>
        <div className={styles.icon}>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            title="facebook"
          >
            <Image src={facebook} alt="Facebook Icon" priority />
          </Link>
          <Link href="https://twitter.com/" target="_blank" title="twitter">
            <Image src={twitter} alt="Twitter Icon" priority />
          </Link>
          <Link href="https://www.youtube.com/" target="_blank" title="youtube">
            <Image src={youtube} alt="Youtube Icon" priority />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            title="instagram"
          >
            <Image src={instagram} alt="Instagram Icon" priority />
          </Link>
        </div>
      </div>
    </div>
  );
}
