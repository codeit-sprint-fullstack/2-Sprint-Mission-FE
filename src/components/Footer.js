import React from "react";
import "../style/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="codeit">@codeit-2024</div>
      <div>
        <div>Privacy Policy</div>
        <div>FAQ</div>
      </div>
      <div>
        <a href="https://www.facebook.com/?locale=ko_KR" target="blank">
          <img
            src="/img/facebookIcon.png"
            className="facebookIcon"
            alt="facebookIcon"
          />
        </a>
        <a href="https://x.com/?lang=ko" target="blank">
          <img
            src="/img/twitterIcon.png"
            className="twitterIcon"
            alt="twitterIcon"
          />
        </a>
        <a href="https://www.youtube.com/" target="blank">
          <img
            src="/img/youtubeIcon.png"
            className="youtubeIcon"
            alt="youtubeIcon"
          />
        </a>
        <a href="https://www.instagram.com/" target="blank">
          <img
            src="/img/instagramIcon.png"
            className="instagramIcon"
            alt="instagramIcon"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
