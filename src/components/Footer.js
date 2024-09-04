import React from "react";
import facebookImg from "../images/icon/facebook.png";
import twitterImg from "../images/icon/twitter.png";
import youtubeImg from "../images/icon/youtube.png";
import instagramImg from "../images/icon/instagram.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div class="footer-content">
          <div class="copyright"> @codeit - 2024 </div>

          <div class="footerlink">
            <a href="privacy.html">Privacy Policy</a>
            <a href="faq.html">FAQ</a>
          </div>

          <div class="snsicon">
            <a href="https://www.facebook.com/">
              <img src={facebookImg} alt="페이스북" id="facebookicon" />
            </a>
            <a href="https://twitter.com/">
              <img src={twitterImg} alt="트위터" id="twittericon" />
            </a>
            <a href="https://www.youtube.com/">
              <img src={youtubeImg} alt="유튜브" id="youtubeicon" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={instagramImg} alt="인스타그램" id="instagramicon" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
