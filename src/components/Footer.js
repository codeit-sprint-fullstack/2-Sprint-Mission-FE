import '../css/Footer.css'
import facebookIc from '../image/ic_facebook.png'
import twitterIc from '../image/ic_twitter.png'
import youtubeIc from '../image/ic_youtube.png'
import instagramIc from '../image/ic_instagram.png'

export default function Footer() {
  return (
    <footer>
      <div className="company">
        ©codeit - 2024
      </div>
      <div className="footerMenu">
        <a href="./privacy/">Privacy Policy</a>
        <a href="./faq/">FAQ</a>
      </div>
      <div className="snsLink">
        <a href="https://www.facebook.com/" target="_blank"><img src={facebookIc} alt="페이스북" /></a>
        <a href="https://twitter.com/" target="_blank"><img src={twitterIc} alt="트위터" /></a>
        <a href="https://www.youtube.com/" target="_blank"><img src={youtubeIc} alt="유튜브" /></a>
        <a href="https://www.instagram.com/" target="_blank"><img src={instagramIc} alt="인스타그램" /></a>
      </div>
    </footer>
  );
}