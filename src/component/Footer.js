import "../page/HomeStyle/global.css";
import "../page/HomeStyle/home.css";
import facebook from "../imgFile/facebook.png";
import instagram from "../imgFile/instagram.png";
import twitter from "../imgFile/twitter.png";
import youtube from "../imgFile/youtube.png";

function Footer() {
  return (
    <footer>
      <div id="copyright">©codeit - 2024</div>
      <div id="footerMenu">
        <a href="privacy.html">Privacy Policy</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div id="socialMedia">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="판다마켓 페이스북"
        >
          <img src={facebook} alt="페이스북" width="20" />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="판다마켓 트위터"
        >
          <img src={twitter} alt="트위터" width="20" />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="판다마켓 유튜브"
        >
          <img src={youtube} alt="유튜브" width="20" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="판다마켓 인스타그램"
        >
          <img src={instagram} alt="인스타그램" width="20" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
