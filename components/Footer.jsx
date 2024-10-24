import React from "react";
import facebookImg from "../images/icon/facebook.png";
import twitterImg from "../images/icon/twitter.png";
import youtubeImg from "../images/icon/youtube.png";
import instagramImg from "../images/icon/instagram.png";
import styles from "../components/css/Footer.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer_container}>
        <div className={styles.footer_content}>
          <div className={styles.copyright}> @codeit - 2024 </div>
          <div className={styles.link_icon}>
            <div className={styles.footerlink}>
              <Link href="privacy.html">Privacy Policy</Link>
              <Link href="faq.html">FAQ</Link>
            </div>

            <div className={styles.snsicon}>
              <Link href="https://www.facebook.com/">
                <Image src={facebookImg} alt="페이스북" id="facebookicon" />
              </Link>
              <Link href="https://twitter.com/">
                <Image src={twitterImg} alt="트위터" id="twittericon" />
              </Link>
              <Link href="https://www.youtube.com/">
                <Image src={youtubeImg} alt="유튜브" id="youtubeicon" />
              </Link>
              <Link href="https://www.instagram.com/">
                <Image src={instagramImg} alt="인스타그램" id="instagramicon" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

Footer;
