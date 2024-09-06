import "./Footer.css";
import facebook from "./imgFile/facebook.png";
import instagram from "./imgFile/instagram.png";
import twitter from "./imgFile/twitter.png";
import youtube from "./imgFile/youtube.png";

function Footer() {
  return (
    <div className="FooterBox">
      <div className="FooterMenu">
        <p className="FooterCodeit">@codeit - 2024</p>
        <div className="FooterCenter">
          <p>Public Policy</p>
          <p>FAQ</p>
        </div>
        <div className="FooterSocialImg">
          <a href="https://facebook.com" target="_blank">
            <img src={facebook} alt="facebook" className="FooterImage" />
          </a>
          <a href="https://instagram.com" target="_blank">
            <img src={instagram} alt="instagram" className="FooterImage" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <img src={twitter} alt="twitter" className="FooterImage" />
          </a>
          <a href="https://youtube.com" target="_blank">
            <img src={youtube} alt="youtube" className="FooterImage" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
