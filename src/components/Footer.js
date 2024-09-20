import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import icFacebook from '../assets/ic_facebook.svg';
import icTwitter from '../assets/ic_twitter.svg';
import icYoutube from '../assets/ic_youtube.svg';
import icInstagram from '../assets/ic_instagram.svg';

const Footer = () => {
  return (
    <footer>
      <p id="footer_codeit" className="footer">@codeit - 2024</p>
      <div id="footer_menu" className="footer">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <div id="footer_social-media" className="footer">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img className="footer_img_fb" src={icFacebook} alt="Facebook" />
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img className="footer_img_tw" src={icTwitter} alt="Twitter" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img className="footer_img_yt" src={icYoutube} alt="YouTube" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img className="footer_img_ig" src={icInstagram} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
