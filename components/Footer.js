import style from "./styles/Footer.module.css";
import facebookIC from "@/public/ic_facebook.png";
import twitterIC from "@/public/ic_twitter.png";
import youtubeIC from "@/public/ic_youtube.png";
import instagramIC from "@/public/ic_instagram.png";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerIcon}>
        <p className={style.codeit}>@codeit - 2024</p>
        <div className={style.PF}>
          <p className={style.privacy}>
            <Link className={style.link} href="/privacy">Privacy Policy</Link>
          </p>
          <p className={style.FAQ}>
            <Link className={style.link} href="/faq">FAQ</Link>
          </p>
        </div>
        <div className={style.icon}>
          <Link href="https://www.facebook.com/" target="_blank" title="Facebook" rel="noopener noreferrer">
            <Image src={facebookIC} alt="Facebook Icon" />
          </Link>
          <Link href="https://twitter.com/" target="_blank" title="Twitter" rel="noopener noreferrer">
            <Image src={twitterIC} alt="Twitter Icon" />
          </Link>
          <Link href="https://www.youtube.com/" target="_blank" title="YouTube" rel="noopener noreferrer">
            <Image src={youtubeIC} alt="YouTube Icon" />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank" title="Instagram" rel="noopener noreferrer">
            <Image src={instagramIC} alt="Instagram Icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
}